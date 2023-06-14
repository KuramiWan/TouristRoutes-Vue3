-- 注意：该页面对应的前台目录为views/product文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2023061403353860260', NULL, '旅游产品表', '/product/productList', 'product/ProductList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2023-06-14 15:35:26', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023061403353860261', '2023061403353860260', '添加旅游产品表', NULL, NULL, 0, NULL, NULL, 2, 'product:product:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-06-14 15:35:26', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023061403353860262', '2023061403353860260', '编辑旅游产品表', NULL, NULL, 0, NULL, NULL, 2, 'product:product:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-06-14 15:35:26', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023061403353860263', '2023061403353860260', '删除旅游产品表', NULL, NULL, 0, NULL, NULL, 2, 'product:product:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-06-14 15:35:26', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023061403353860264', '2023061403353860260', '批量删除旅游产品表', NULL, NULL, 0, NULL, NULL, 2, 'product:product:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-06-14 15:35:26', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023061403353860265', '2023061403353860260', '导出excel_旅游产品表', NULL, NULL, 0, NULL, NULL, 2, 'product:product:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-06-14 15:35:26', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023061403353860266', '2023061403353860260', '导入excel_旅游产品表', NULL, NULL, 0, NULL, NULL, 2, 'product:product:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-06-14 15:35:26', NULL, NULL, 0, 0, '1', 0);