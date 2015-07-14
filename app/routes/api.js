var bodyParser = require('body-parser');
var User       = require('../models/user');
var Client	   = require('../models/client');
var Good	   = require('../models/good');
var GoodCate	   = require('../models/goodCate');
var GoodBrand	   = require('../models/goodBrand');
var GoodApplier	   = require('../models/goodApplier');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();

	// 路由验证用户信息 (POST http://localhost:8080/api/authenticate)
	apiRouter.post('/authenticate', function(req, res) {

	  // find the user -- it's going to the collection in mongo
	  User.findOne({
	    username: req.body.username
	  }).select('name username password').exec(function(err, user) {

	    if (err) throw err;

	    // no user with that username was found
	    else if (!user) {
	      res.json({ 
	      	success: false,
 	      	message: '找不到此用户，请检查后重新输入.'
	    	});
	    } else if (user) {

	      // check if password matches
	      var validPassword = user.comparePassword(req.body.password);
	      if (!validPassword) {
	        res.json({ 
	        	success: false, 
	        	message: '密码错误，请重新输入.'
	      	});
	      } else {
	        // if user is found and password is right
	        // create a token
	        var token = jwt.sign({
	        	name: user.name,
	        	username: user.username
	        }, superSecret, {
	          expiresInMinutes: 1440 // expires in 24 hours
	        });

	        // return the information including token as JSON
	        res.json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
	      }   

	    }

	  });
	});

	// 路由中间件去验证标识route middleware to verify a token
	apiRouter.use(function(req, res, next) {
		// do logging
		console.log('Somebody just came to our app!');

	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, superSecret, function(err, decoded) {      

	      if (err) {
	        res.status(403).send({ 
	        	success: false, 
	        	message: 'Failed to authenticate token.' 
	    	});  	   
	      } else { 
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;
	            
	        next(); // make sure we go to the next routes and don't stop here
	      }
	    });

	  } else {

	    // if there is no token
	    // return an HTTP response of 403 (access forbidden) and an error message
   	 	//if for any reason you want to get rid of authentication comment this out and add the next callback
   	 	res.status(403).send({ 
   	 		success: false, 
   	 		message: 'No token provided.' 
   	 	});
	    
	  }
	});

	// 测试保证一切正常工作test route to make sure everything is working
	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		res.json({ message: '成功进入api之路!' });
	});

	// on routes that end in /users
	// ----------------------------------------------------
	apiRouter.route('/users')

		// 创建用户 (accessed at POST http://localhost:8080/users)
		.post(function(req, res) {
			
			var user = new User();		// create a new instance of the User model
			user.name = req.body.name;  // set the users name (comes from the request)
			user.username = req.body.username;  // set the users username (comes from the request)
			user.password = req.body.password;  // set the users password (comes from the request)
			user.position = req.body.position;
			user.number = req.body.number;
			user.phone = req.body.phone;
			user.comment = req.body.comment;
			user.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000) 
						return res.json({ success: false, message: '此用户已存在. '});
					else 
						return res.send(err);
				}

				// return a message
				res.json({ message: '创建用户成功!' });
			});

		})

		// 获取所有用户 (accessed at GET http://localhost:8080/api/users)
		.get(function(req, res) {

			User.find({}, function(err, users) {
				if (err) res.send(err);

				// return the users
				res.json(users);
			});
		});

	// on routes that end in /users/:user_id
	// ----------------------------------------------------
	apiRouter.route('/users/:user_id')

		// 根据_id获取用户
		.get(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) res.send(err);

				// return that user
				res.json(user);
			});
		})

		// 更新当前_id用户信息
		.put(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {

				if (err) res.send(err);

				// 如果在请求中，设置新的用户信息set the new user information if it exists in the request
				if (req.body.name) user.name = req.body.name;
				if (req.body.username) user.username = req.body.username;
				if (req.body.password) user.password = req.body.password;
				if (req.body.position) user.position = req.body.position;
				if (req.body.number) user.number = req.body.number;
				if (req.body.phone) user.phone = req.body.phone;
				if (req.body.comment) user.comment = req.body.comment;
				// 保存用户
				user.save(function(err) {
					if (err) res.send(err);

					// 返回信息
					res.json({ message: '更新用户成功!' });
				});

			});
		})

		// 删除当前_id用户
		.delete(function(req, res) {
			User.remove({
				_id: req.params.user_id
			}, function(err, user) {
				if (err) res.send(err);

				res.json({ message: '删除用户成功' });
			});
		});

	// on routes that end in /clients
	// ----------------------------------------------------
	apiRouter.route('/clients')

		// 创建顾客 (accessed at POST http://localhost:8080/clients)
		.post(function(req, res) {

			var client = new Client();		// create a new instance of the Client model
			client.name = req.body.name;
			client.phone = req.body.phone;
			client.type = req.body.type;
			client.birthday = req.body.birthday;
			client.sex = req.body.sex;
			client.money = req.body.money;
			client.point = req.body.point;
			client.rlevel = req.body.rlevel;
			client.wlevel = req.body.wlevel;
			client.company = req.body.company;
			client.contact = req.body.contact;
			client.address = req.body.address;
			client.comment = req.body.comment;
			client.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000)
						return res.json({ success: false, message: '此顾客已存在. '});
					else
						return res.send(err);
				}

				// return a message
				res.json({ message: '创建顾客成功!' });
			});

		})

		// 获取所有顾客 (accessed at GET http://localhost:8080/api/clients)
		.get(function(req, res) {

			Client.find({}, function(err, clients) {
				if (err) res.send(err);

				// return the users
				res.json(clients);
			});
		});

	// on routes that end in /clients/:client_id
	// ----------------------------------------------------
	apiRouter.route('/clients/:client_id')

		// 根据_id获取顾客
		.get(function(req, res) {
			Client.findById(req.params.client_id, function(err, client) {
				if (err) res.send(err);

				// return that client
				res.json(client);
			});
		})

		// 更新当前_id顾客信息
		.put(function(req, res) {
			Client.findById(req.params.client_id, function(err, client) {

				if (err) res.send(err);

				// 如果在请求中，设置新的用户信息set the new user information if it exists in the request
				if (req.body.name) client.name = req.body.name;
				if (req.body.phone) client.phone = req.body.phone;
				if (req.body.type) client.type = req.body.type;
				if (req.body.birthday) client.birthday = req.body.birthday;
				if (req.body.sex) client.sex = req.body.sex;
				if (req.body.money) client.money = req.body.money;
				if (req.body.point) client.point = req.body.point;
				if (req.body.rlevel) client.rlevel = req.body.rlevel;
				if (req.body.wlevel) client.wlevel = req.body.wlevel;
				if (req.body.company) client.company = req.body.company;
				if (req.body.contact) client.contact = req.body.contact;
				if (req.body.address) client.address = req.body.address;
				if (req.body.comment) client.comment = req.body.comment;

				// 保存用户
				client.save(function(err) {
					if (err) res.send(err);

					// 返回信息
					res.json({ message: '更新顾客成功!' });
				});

			});
		})

		// 删除当前_id顾客
		.delete(function(req, res) {
			Client.remove({
				_id: req.params.client_id
			}, function(err, client) {
				if (err) res.send(err);

				res.json({ message: '删除顾客成功' });
			});
		});

	// on routes that end in /clients
	// ----------------------------------------------------
	apiRouter.route('/goods')

		// 创建顾客 (accessed at POST http://localhost:8080/clients)
		.post(function(req, res) {

			var good = new Good();		// create a new instance of the Client model
			good.number = req.body.number;
			good.name = req.body.name;
			good.type = req.body.type;
			good.category = req.body.category;
			good.brand = req.body.brand;
			/*good.priceType = req.body.priceType;*/
			good.price1 = req.body.price1;
			good.price2 = req.body.price2;
			good.price3 = req.body.price3;
			good.price4 = req.body.price4;
			good.price5 = req.body.price5;
			good.cost = req.body.cost;
			good.warehouse = req.body.warehouse;
			good.quantity = req.body.quantity;
			good.applier = req.body.applier;
			good.barcode = req.body.barcode;
			good.comment = req.body.comment;
			good.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000)
						return res.json({ success: false, message: '此商品已存在，请修改数量. '});
					else
						return res.send(err);
				}

				// return a message
				res.json({ message: '创建商品成功!' });
			});

		})

		// 获取所有顾客 (accessed at GET http://localhost:8080/api/clients)
		.get(function(req, res) {

			Good.find({}, function(err, goods) {
				if (err) res.send(err);

				// return the users
				res.json(goods);
			});
		});

	// on routes that end in /clients/:client_id
	// ----------------------------------------------------
	apiRouter.route('/goods/:good_id')

		// 根据_id获取顾客
		.get(function(req, res) {
			Good.findById(req.params.good_id, function(err, good) {
				if (err) res.send(err);

				// return that client
				res.json(good);
			});
		})

		// 更新当前_id顾客信息
		.put(function(req, res) {
			Good.findById(req.params.good_id, function(err, good) {

				if (err) res.send(err);

				// 如果在请求中，设置新的用户信息set the new user information if it exists in the request
				if (req.body.number) good.number = req.body.number;
				if (req.body.name) good.name = req.body.name;
				if (req.body.type) good.type = req.body.type;
				if (req.body.category) good.category = req.body.category;
				if (req.body.brand) good.brand = req.body.brand;
				if (req.body.priceType) good.priceType = req.body.priceType;
				if (req.body.price1) good.priceType = req.body.priceType;
				if (req.body.price2) good.price2 = req.body.price2;
				if (req.body.price3) good.price3 = req.body.price3;
				if (req.body.price4) good.price4 = req.body.price4;
				if (req.body.price5) good.price5 = req.body.price5;
				if (req.body.cost) good.cost = req.body.cost;
				if (req.body.warehouse) good.warehouse = req.body.warehouse;
				if (req.body.quantity) good.quantity = req.body.quantity;
				if (req.body.applier) good.applier = req.body.applier;
				if (req.body.barcode) good.barcode = req.body.barcode;
				if (req.body.comment) good.comment = req.body.comment;
				// 保存用户
				good.save(function(err) {
					if (err) res.send(err);

					// 返回信息
					res.json({ message: '更新商品成功!' });
				});

			});
		})

		// 删除当前_id顾客
		.delete(function(req, res) {
			Good.remove({
				_id: req.params.good_id
			}, function(err, good) {
				if (err)res.send(err);

				res.json({ message: '删除商品成功' });
			});
		});
// on routes that end in /clients
	// ----------------------------------------------------

	apiRouter.route('/goodCates')

		// 创建顾客 (accessed at POST http://localhost:8080/clients)
		.post(function(req, res) {

			var goodCate = new GoodCate();		// create a new instance of the Client model
			goodCate.number = req.body.number;
			goodCate.name = req.body.name;

			goodCate.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000)
						return res.json({ success: false, message: '此类别已存在 '});
					else
						return res.send(err);
				}

				// return a message
				res.json({ message: '创建类别成功!' });
			});

		})

		// 获取所有顾客 (accessed at GET http://localhost:8080/api/clients)
		.get(function(req, res) {

			GoodCate.find({}, function(err, goodCates) {
				if (err) res.send(err);

				// return the users
				res.json(goodCates);
			});
		});

// on routes that end in /clients/:client_id
// ----------------------------------------------------
	apiRouter.route('/goodCates/:goodCate_id')

		// 根据_id获取顾客
		.get(function(req, res) {
			GoodCate.findById(req.params.goodCate_id, function(err, goodCate) {
				if (err) res.send(err);

				// return that client
				res.json(goodCate);
			});
		})

		// 更新当前_id顾客信息
		.put(function(req, res) {
			GoodCate.findById(req.params.goodCate_id, function(err, goodCate) {

				if (err) res.send(err);

				// 如果在请求中，设置新的用户信息set the new user information if it exists in the request
				if (req.body.number) goodCate.number = req.body.number;
				if (req.body.name) goodCate.name = req.body.name;

				// 保存用户
				goodCate.save(function(err) {
					if (err) res.send(err);

					// 返回信息
					res.json({ message: '更新类别成功!' });
				});

			});
		})

		// 删除当前_id顾客
		.delete(function(req, res) {
			GoodCate.remove({
				_id: req.params.goodCate_id
			}, function(err, goodCate) {
				if (err)res.send(err);

				res.json({ message: '删除类别成功' });
			});
		});

	// on routes that end in /clients
	// ----------------------------------------------------

	apiRouter.route('/goodBrands')

		// 创建顾客 (accessed at POST http://localhost:8080/clients)
		.post(function(req, res) {

			var goodBrand = new GoodBrand();		// create a new instance of the Client model
			goodBrand.number = req.body.number;
			goodBrand.name = req.body.name;

			goodBrand.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000)
						return res.json({ success: false, message: '此类别已存在 '});
					else
						return res.send(err);
				}

				// return a message
				res.json({ message: '创建品牌成功!' });
			});

		})

		// 获取所有顾客 (accessed at GET http://localhost:8080/api/clients)
		.get(function(req, res) {

			GoodBrand.find({}, function(err, goodBrands) {
				if (err) res.send(err);

				// return the users
				res.json(goodBrands);
			});
		});

// on routes that end in /clients/:client_id
// ----------------------------------------------------
	apiRouter.route('/goodBrands/:goodBrand_id')

		// 根据_id获取顾客
		.get(function(req, res) {
			GoodBrand.findById(req.params.goodBrand_id, function(err, goodBrand) {
				if (err) res.send(err);

				// return that client
				res.json(goodBrand);
			});
		})

		// 更新当前_id顾客信息
		.put(function(req, res) {
			GoodBrand.findById(req.params.goodBrand_id, function(err, goodBrand) {

				if (err) res.send(err);

				// 如果在请求中，设置新的用户信息set the new user information if it exists in the request
				if (req.body.number) goodBrand.number = req.body.number;
				if (req.body.name) goodBrand.name = req.body.name;

				// 保存用户
				goodBrand.save(function(err) {
					if (err) res.send(err);

					// 返回信息
					res.json({ message: '更新品牌成功!' });
				});

			});
		})

		// 删除当前_id顾客
		.delete(function(req, res) {
			GoodBrand.remove({
				_id: req.params.goodBrand_id
			}, function(err, goodBrand) {
				if (err)res.send(err);

				res.json({ message: '删除品牌成功' });
			});
		});

	// on routes that end in /clients
// ----------------------------------------------------

	apiRouter.route('/goodAppliers')

		// 创建顾客 (accessed at POST http://localhost:8080/clients)
		.post(function(req, res) {

			var goodApplier = new GoodApplier();		// create a new instance of the Client model
			goodApplier.number = req.body.number;
			goodApplier.name = req.body.name;

			goodApplier.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000)
						return res.json({ success: false, message: '此类别已存在 '});
					else
						return res.send(err);
				}

				// return a message
				res.json({ message: '创建供应商成功!' });

			});

		})

		// 获取所有顾客 (accessed at GET http://localhost:8080/api/clients)
		.get(function(req, res) {

			GoodApplier.find({}, function(err, goodAppliers) {
				if (err) res.send(err);

				// return the users
				res.json(goodAppliers);
			});
		});

// on routes that end in /clients/:client_id
// ----------------------------------------------------
	apiRouter.route('/goodAppliers/:goodApplier_id')

		// 根据_id获取顾客
		.get(function(req, res) {
			GoodApplier.findById(req.params.goodApplier_id, function(err, goodApplier) {
				if (err) res.send(err);

				// return that client
				res.json(goodApplier);
			});
		})

		// 更新当前_id顾客信息
		.put(function(req, res) {
			GoodApplier.findById(req.params.goodApplier_id, function(err, goodApplier) {

				if (err) res.send(err);

				// 如果在请求中，设置新的用户信息set the new user information if it exists in the request
				if (req.body.number) goodApplier.number = req.body.number;
				if (req.body.name) goodApplier.name = req.body.name;

				// 保存用户
				goodApplier.save(function(err) {
					if (err) res.send(err);

					// 返回信息
					res.json({ message: '更新供应商成功!' });
				});

			});
		})

		// 删除当前_id顾客
		.delete(function(req, res) {
			GoodApplier.remove({
				_id: req.params.goodApplier_id
			}, function(err, goodApplier) {
				if (err)res.send(err);

				res.json({ message: '删除供应商成功' });
			});
		});

	// api中获取用户信息的断点api endpoint to get user information
	apiRouter.get('/me', function(req, res) {
		res.send(req.decoded);
	});

	return apiRouter;
};