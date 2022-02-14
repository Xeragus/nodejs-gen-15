/**
 * 1. Imame html button
 * 2. onClick ja povikuvame funkcijata deleteCompany vo js i prakjame company id
 * 3. deleteCompany isprakja DELETE request na /companies/:id
 * 4. Na backend-ot se brise kompanijata i se vrakja response (prazen json, sto sakate moze da bide)
 * 5. vo deleteCompany se spravuvame so promise-ot i go cekame response-ot
 * 6. Stom response-ot stigne, ja refresh-irame stranata za od novo da se vcitaat zapisite
 */

function deleteCompany(id) {
  fetch('http://localhost:3000/companies/' + id, {
    method: 'DELETE',
  })
  .then(res => res.text())
  .then(res => {
    location.reload();
  })
}

function deleteEmployee(id) {
  fetch('http://localhost:3000/employees/' + id, {
    method: 'DELETE',
  })
  .then(res => res.text())
  .then(res => {
    location.reload();
  })
}
