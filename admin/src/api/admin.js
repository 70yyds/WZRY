import request from '../utils/request'
// --------------------父
export function postParent(data) {
  return request({
    url: '/rest/parentcate',
    method: 'post',
    data
  })
}

export function getParentCateList() {
  return request({
    url: '/rest/parentcate',
    method: 'get'
  })
}

export function deleteParentByid(id) {
  return request({
    url: '/rest/parentcate/' + id,
    method: 'delete'
  })
}
// --------------------子
export function getList() {
  return request({
    url: '/rest/category',
    method: 'get'
  })
}
export function getDetailByid(id) {
  return request({
    url: '/rest/category/' + id,
    method: 'get'

  })
}
export function postCate(parameter) {
  return request({
    url: '/rest/category',
    method: 'post',
    data: parameter
  })
}
export function editCate(id, data) {
  return request({
    url: '/rest/category/' + id,
    method: 'put',
    data
  })
}
export function deleteCate(id) {
  return request({
    url: '/rest/category/' + id,
    method: 'delete'
  })
}
// -----------------------物品
export function itemsList() {
  return request({
    url: '/rest/Item',
    method: 'get'
  })
}
export function getItemsByid(id) {
  return request({
    url: '/rest/Item/' + id,
    method: 'get'

  })
}
export function postItems(parameter) {
  return request({
    url: '/rest/Item',
    method: 'post',
    data: parameter
  })
}
export function editItems(id, data) {
  return request({
    url: '/rest/Item/' + id,
    method: 'put',
    data
  })
}
export function deleteItems(id) {
  return request({
    url: '/rest/Item/' + id,
    method: 'delete'
  })
}
// 英雄
export function heroList() {
  return request({
    url: '/rest/Hero',
    method: 'get'
  })
}
export function getHeroByid(id) {
  return request({
    url: '/rest/Hero/' + id,
    method: 'get'

  })
}
export function postHero(parameter) {
  return request({
    url: '/rest/Hero',
    method: 'post',
    data: parameter
  })
}
export function editHero(id, data) {
  return request({
    url: '/rest/Hero/' + id,
    method: 'put',
    data
  })
}
export function deleteHero(id) {
  return request({
    url: '/rest/Hero/' + id,
    method: 'delete'
  })
}
// 上传图标
export function uploadFile(data) {
  return request({
    url: '/upload',
    method: 'post',
    data
  })
}

// 文章
export function getArticle() {
  return request({
    url: '/rest/article',
    method: 'get'
  })
}
export function getArticleByid(id) {
  return request({
    url: '/rest/article/' + id,
    method: 'get'

  })
}
export function postArticle(parameter) {
  return request({
    url: '/rest/article',
    method: 'post',
    data: parameter
  })
}
export function editArticle(id, data) {
  return request({
    url: '/rest/article/' + id,
    method: 'put',
    data
  })
}
export function deleteArticle(id) {
  return request({
    url: '/rest/article/' + id,
    method: 'delete'
  })
}
// 用户
export function getUser() {
  return request({
    url: '/rest/user',
    method: 'get'
  })
}
export function getUserByid(id) {
  return request({
    url: '/rest/user/' + id,
    method: 'get'

  })
}
export function postUser(parameter) {
  return request({
    url: '/rest/user',
    method: 'post',
    data: parameter
  })
}
export function editUser(id, data) {
  return request({
    url: '/rest/user/' + id,
    method: 'put',
    data
  })
}
export function deleteUser(id) {
  return request({
    url: '/rest/user/' + id,
    method: 'delete'
  })
}

