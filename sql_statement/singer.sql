CREATE TABLE `wang`.`singer` (
  `seq_id` INT NOT NULL,
  `singer_name` VARCHAR(45) NULL COMMENT '歌手名称',
  `sex` INT NULL COMMENT '性别 0：男 1：女 ',
  `remark` VARCHAR(500) NULL COMMENT '备注',
  `createtime` VARCHAR(45) NULL COMMENT '\'创建时间\'',
  PRIMARY KEY (`seq_id`));
