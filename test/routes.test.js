'use strict'

var test = require('tape') // assertion library
var request = require('supertest')
var app = require('express')()
var server = require('../server')

// run the server
server(app)

test('test response from routes', function (t) {
  test.onFinish(() => {
     // stop the server after the tests have run
     app.server.close()
  })

  let zip_url = '/getZipCounties/'
  t.test(zip_url + ' returns correct data', function (st) {
    let sample_query = '78749'
    request(app)
      .get(zip_url + sample_query)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        st.error(err, 'No error')
       // st.same(res.body.zip_codes[0].code, sample_query, 'Query same as result')
        st.end()
      })
  })

  let plans_url = '/findPlans/'
  let plans_post_body = {
    // applicants:[{age:31,smoker:false}],
    market: 'individual',
    zip_code: '78749',
    fips_code: '48453',
    // drug_packages:["01002-1200-11"],
    household_size: 4,
    household_income: 40000,
    page: 1, // optional paginated results
    per_page: 2, // results per page
    // select:"plans.hios_issuer_id,plans.carrier_name", // select specific fields
    sort: 'premium:asc'
  }
  t.test(plans_url + ' returns data', function (st) {
    request(app)
      .post(plans_url)
      .send(plans_post_body)
      .expect(200)
      .end(function (err, res) {
        if (err) console.log(err)
        st.error(err, 'No error')
        st.end()
      })
  })

  let prov_url = '/findProviders/'
  let prov_post_body = {
    zip_code: '78749', // req
    searchTerm: '', // optional
    hios_ids: ['29418TX0160005', '33602TX0460274'], // req
    radius: '10', // req
    type: 'individual', // or 'organization', req
    page: 1, // optional paginated results
    per_page: 3, // optional results per page
  }
  t.test(prov_url + ' returns data', function (st) {
    request(app)
      .post(prov_url)
      .send(prov_post_body)
      .expect(200)
      .end(function (err, res) {
        if (err) console.log(err)
        st.error(err, 'No error')
        st.end()
      })
  })
})
