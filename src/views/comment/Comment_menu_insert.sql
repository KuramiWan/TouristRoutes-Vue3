-- 注意：该页面对应的前台目录为views/comment文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2023070103023860020', NULL, '产品评论表', '/comment/commentList', 'comment/CommentList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2023-07-01 15:02:02', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023070103023860021', '2023070103023860020', '添加产品评论表', NULL, NULL, 0, NULL, NULL, 2, 'comment:comment:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-01 15:02:02', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023070103023860022', '2023070103023860020', '编辑产品评论表', NULL, NULL, 0, NULL, NULL, 2, 'comment:comment:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-01 15:02:02', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023070103023860023', '2023070103023860020', '删除产品评论表', NULL, NULL, 0, NULL, NULL, 2, 'comment:comment:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-01 15:02:02', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023070103023860024', '2023070103023860020', '批量删除产品评论表', NULL, NULL, 0, NULL, NULL, 2, 'comment:comment:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-01 15:02:02', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023070103023860025', '2023070103023860020', '导出excel_产品评论表', NULL, NULL, 0, NULL, NULL, 2, 'comment:comment:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-01 15:02:02', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023070103023860026', '2023070103023860020', '导入excel_产品评论表', NULL, NULL, 0, NULL, NULL, 2, 'comment:comment:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-01 15:02:02', NULL, NULL, 0, 0, '1', 0);