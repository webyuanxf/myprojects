const pool = require("../pool");
const express = require("express");
var router = express.Router();

//添加用户
router.post("/add", (req, res) => {
    var obj = req.body;
    console.log(obj);
    var uname = req.body.uname;
    if (!uname) {
        res.send({ code: -1, msg: '用户名必填' });
        return;
    }
    var upwd = req.body.upwd;
    if (!upwd) {
        res.send({ code: -2, msg: '密码必填' });
        return;
    }
    var upic = req.body.upic;
    if (!upic) {
        res.send({ code: -3, msg: '头像必填' });
        return;;;
    }\\
    var sql = "select uname from users where uname=?";
    pool.query(sql, [uname], (err, result) => {
        if (err) throw err;
        console.log(result);
        // console.log(result[0].uname);
        // console.log(uname);
        if (result.length > 0) {
            res.send({ code: -4, msg: '该用户以被注册' });
        } else {
            var sql = `insert into users values(null,?,?,?,now(),0)`;
            pool.query(sql, [uname, upwd, upic], (err, result) => {
                if (err) throw err;
                // if(resulsy)
                if (result.affectedRows > 0) {
                    res.send({ code: 1, msg: '注册成功' })
                } else {
                    res.send({ code: -5, msg: '注册失败' })
                }
            })
        }
    })
})
router.post("/login", (req, res) => {
    console.log(req.body);
    var uname = req.body.uname;
    if (!uname) {
        res.send({ code: -1, msg: '用户名必须' })
    }
    var upwd = req.body.upwd;
    if (!upwd) {
        res.send({ code: -2, msg: '用户密码必须' });
    }
    var sql = "select * from users where uname=? and binary upwd=?";
    pool.query(sql, [uname, upwd], (err, result) => {
        if (err) throw err;
        // res.send(result);
        if (result.length > 0) {
            var sql = "update users set logincount=logincount+1 where uname=?";
            pool.query(sql, [uname], (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {
                    res.send({ code: 1, msg: '登录成功，并且登录册数加一' })
                }
            })
        } else {
            res.send({ code: -3, msg: '用户名或密码错误' });
        }
    })
})
router.get("/selectAll", (req, res) => {
    var sql = "select * from users";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0)
            res.send(result)
        else
            res.send({ code: -1, msg: '查询失败' })
            /*  var html="";
              for(var i=0;i<result.length;i++){
                  var list=result[i];
                  // console.log(result[i])
                  // console.log(list);
                  html+=` <tr align="center">
                  <td>${list.uid}</td>
                  <td>${list.uname}</td>
                  <td>${list.upwd}</td>
                  <td><img src="../${list.headpic}"></td>
                  <td>${list.regtime.toLocaleString()}</td>
                  <td>${list.logincount}</td>
              </tr>`
              }
              res.send(`
                 <table border='1' cellspacing="0" align="center">
                     <thead>
                          <tr>
                              <th>用户编号</th>
                              <th>用户姓名</th>
                              <th>用户密码</th>
                              <th>用户头像</th>
                              <th>注册时间</th>
                              <th>用户登录次数</th>
                          </tr>
                     </thead>
                     <tbody>
                         ${html}
                     </tbody>
                 </table>
              `);*/
    })
})
router.get("/del", (req, res) => {
    var uid = req.query.uid;
    console.log(uid);
    var sql = "select * from users where uid=?";
    pool.query(sql, [uid], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.length > 0) {
            var sql = "delete from users where uid=?";
            pool.query(sql, [uid], (err, result) => {
                if (err) throw err;
                console.log(result);
                if (result.affectedRows > 0) {
                    res.send({ code: 1, msg: '删除成功' })
                } else {
                    res.send({ code: -2, msg: '删除失败' })
                }
            })
        } else {
            res.send({ code: -1, msg: '该用户不存在，请重新输入' })
        }
    })
})
router.post("/updateUpwd", (req, res) => {
    var uid = req.body.uid;
    if (!uid) {
        res.send({ code: -1, msg: '用户id必须' })
    }
    var oldpwd = req.body.oldpwd;
    if (!oldpwd) {
        res.send({ code: -2, msg: '用户密码必须' })
    }
    var newpwd = req.body.newpwd;
    if (!newpwd) {
        res.send({ code: -3, msg: '用户新密码必须' })
    }
    var sql = "select * from users where upwd=? and uid=?";
    pool.query(sql, [oldpwd, uid], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.length > 0) {
            var sql = "update users set upwd=? where uid=?";
            pool.query(sql, [newpwd, uid], (err, result) => {
                if (err) throw err;
                console.log(result);
                if (result.affectedRows > 0) {
                    res.send({ code: 1, msg: "修改成功" })
                } else {
                    res.send({ code: -4, msg: '修改失败' })
                }
            })
        } else {
            res.send({ code: -4, msg: '该用户不存在或原始密码有误' })
        }
    })
})
router.get("/aaa/:lid", (req, res) => {
    res.send(req.params);
})
module.exports = router;