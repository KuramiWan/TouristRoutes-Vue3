-- 注意：该页面对应的前台目录为views/client文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2023061406046780160', NULL, '游客信息表', '/client/touristList', 'client/TouristList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2023-06-14 18:04:16', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023061406046790161', '2023061406046780160', '添加游客信息表', NULL, NULL, 0, NULL, NULL, 2, 'client:tourist:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-06-14 18:04:16', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023061406046790162', '2023061406046780160', '编辑游客信息表', NULL, NULL, 0, NULL, NULL, 2, 'client:tourist:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-06-14 18:04:16', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023061406046790163', '2023061406046780160', '删除游客信息表', NULL, NULL, 0, NULL, NULL, 2, 'client:tourist:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-06-14 18:04:16', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023061406046790164', '2023061406046780160', '批量删除游客信息表', NULL, NULL, 0, NULL, NULL, 2, 'client:tourist:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-06-14 18:04:16', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023061406046790165', '2023061406046780160', '导出excel_游客信息表', NULL, NULL, 0, NULL, NULL, 2, 'client:tourist:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-06-14 18:04:16', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023061406046790166', '2023061406046780160', '导入excel_游客信息表', NULL, NULL, 0, NULL, NULL, 2, 'client:tourist:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-06-14 18:04:16', NULL, NULL, 0, 0, '1', 0);