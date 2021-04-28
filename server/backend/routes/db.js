import express from 'express'
import sqlite3 from 'sqlite3'

const { Router } = require('express')

const db = new sqlite3.Database('../base-de-datos.db')

db.serialize(function () {
  db.run('CREATE TABLE IF NOT EXISTS lorem (info TEXT)')

  const router = Router()

  router.use(express.json())

  router.post('/db', function(req, res, next) {
    const stmt = db.prepare('INSERT INTO lorem VALUES (?)')
    stmt.run('Ipsum ' + Math.random())
    stmt.finalize()
    res.send('OK')
  })

  router.get('/db', function(req, res, next) {
    let sql = `SELECT rowid AS id, info FROM lorem`
    console.log(sql)
    db.all(sql, function (err, rows) {
      res.json(rows)
    })
  })

  router.get('/db/:id', function(req, res, next) {
    let id = req.params.id
    let sql = `SELECT rowid AS id, info FROM lorem where rowid = ${id}`
    console.log(sql)
    db.get(sql, function (err, row) {
      res.json(row)
    })
  })

  module.exports = router
})
