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
apiRouter.route('/goodCates/:goodCate_id')

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