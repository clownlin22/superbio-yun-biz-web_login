import { stringify } from 'qs';
import request from '@/utils/request';

/* 用户 */
export async function queryUser(params) {
  return request(`/spbbase-authcenter-web/api/user?${stringify(params)}`);
}
export async function addUser(params) {
  return request('/spbbase-authcenter-web/api/user', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function removeUser(params) {
  return request('/spbbase-authcenter-web/api/user', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
export async function updateUser(params) {
  return request('/spbbase-authcenter-web/api/user', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
export async function updateStatusUser(params) {
  return request(`/spbbase-authcenter-web/api/user`, {
    method: 'POST',
    body: {
      ...params,
      method: 'updateStatus',
    },
  });
}
export async function updateUserPass(params) {
  return request(`/spbbase-authcenter-web/api/user`, {
    method: 'POST',
    body: {
      ...params,
      method: 'updatePass',
    },
  });
}

/* 权限表 */
export async function queryPrivilege(params) {
  return request(`/spbbase-authcenter-web/api/permission?${stringify(params)}`);
}
export async function addPrivilege(params) {
  // return request(`/api/permission/insertPermission?${stringify(params)}`, {
  //   method: 'POST',
  // });
  return request('/spbbase-authcenter-web/api/permission', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function removePrivilege(params) {
  // return request(`/api/permission/deletePermission?id=${params}`, {
  //   method: 'POST',
  // });
  return request('/spbbase-authcenter-web/api/permission', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
export async function updatePrivilege(params) {
  // return request(`/api/permission/updatePermission?${stringify(params)}`, {
  //   method: 'POST',
  // });
  return request('/spbbase-authcenter-web/api/permission', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
export async function queryExperimental() {
  return request(`/api/permission/fileState`);
}

/* 字典 */
export async function queryConfState() {
  return request(`/lab/exper/experConfState`);
}
export async function queryReagent() {
  return request(`/lab/mana/reagent`);
}
export async function queryResult() {
  return request(`/lab/mana/experResult`);
}

/* 角色表 */
export async function queryRole(params) {
  return request(`/spbbase-authcenter-web/api/role?${stringify(params)}`);
}
export async function queryPrivileges(params) {
  return request(`/spbbase-authcenter-web/api/permission?${stringify(params)}`);
}
export async function addRole(params) {
  // return request(`/api/role/insertRole?${stringify(params)}`, {
  //   method: 'POST',
  //
  // });
  return request('/spbbase-authcenter-web/api/role', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function removeRole(params) {
  return request('/spbbase-authcenter-web/api/role', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
export async function updateRole(params) {
  // return request(`/api/role/updateRole?${stringify(params)}`, {
  //   method: 'POST',
  // });
  return request('/spbbase-authcenter-web/api/permission', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
export async function updateRoleStatus(params) {
  // return request(`/api/role/updateRoleStatus?${stringify(params)}`, {
  //   method: 'POST',
  // });
  return request(`/spbbase-authcenter-web/api/role`, {
    method: 'POST',
    body: {
      ...params,
      method: 'updateStatus',
    },
  });
}

export async function queryDepart(params) {
  return request(`/spbbase-authcenter-web/api/dept?${stringify(params)}`);
}
export async function queryRoles(params) {
  return request(`/spbbase-authcenter-web/api/role?${stringify(params)}`);
}
export async function insertRoles(params) {
  // return request(`/api/userRole/insertUserRole?userRole=${params}`, {
  //   method: 'POST',
  // });
  return request('/spbbase-authcenter-web/api/dept', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function queryDeparts(params) {
  return request(`/spbbase-authcenter-web/api/dept?${stringify(params)}`);
}
export async function removeDepart(params) {
  // return request(`/api/dept/deleteDept?id=${params}`, {
  //   method: 'POST',
  // });
  return request('/spbbase-authcenter-web/api/dept', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
export async function addDepart(params) {
  // return request(`/api/dept/insertDept?${stringify(params)}`, {
  //   method: 'POST',
  // });
  return request('/spbbase-authcenter-web/api/dept', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function updateDepart(params) {
  // return request(`/api/dept/updateDept?${stringify(params)}`, {
  //   method: 'POST',
  // });
  return request('/spbbase-authcenter-web/api/dept', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function queryExperimentals() {
  return request(`/lab/exper/experExperimental`);
}
export async function queryConfStates() {
  return request(`/lab/exper/experConfState`);
}
export async function queryExceptionDes() {
  return request(`/lab/exce/exceptionDes`);
}
export async function queryExceptionState() {
  return request(`/lab/exce/exceptionState`);
}
