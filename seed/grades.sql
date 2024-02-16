-- Add GRADE
insert into sms.grade (id, name, updatedAt) values ("4","4","2023-06-03 14:25:49");
insert into sms.grade (id, name, updatedAt) values ("5","5","2023-06-03 14:25:49");
insert into sms.grade (id, name, updatedAt) values ("6","6","2023-06-03 14:25:49");
insert into sms.grade (id, name, updatedAt) values ("7","7","2023-06-03 14:25:49");
insert into sms.grade (id, name, updatedAt) values ("8","8","2023-06-03 14:25:49");
insert into sms.grade (id, name, updatedAt) values ("9","9","2023-06-03 14:25:49");
insert into sms.grade (id, name, updatedAt) values ("10","10","2023-06-03 14:25:49");
insert into sms.grade (id, name, updatedAt) values ("11","11","2023-06-03 14:25:49");
insert into sms.grade (id, name, updatedAt) values ("12","12","2023-06-03 14:25:49");


-- Add Section
insert into sms.section (id,gradeId, name,updatedAt) values ("14A",4,"A","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("14B",4,"B","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("14C",4,"C","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("14D",4,"D","2023-06-03 14:25:49");

insert into sms.section (id,gradeId, name,updatedAt) values ("15A",5,"A","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("15B",5,"B","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("15C",5,"C","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("15D",5,"D","2023-06-03 14:25:49");

insert into sms.section (id,gradeId, name,updatedAt) values ("16A",6,"A","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("16B",6,"B","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("16C",6,"C","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("16D",6,"D","2023-06-03 14:25:49");

insert into sms.section (id,gradeId, name,updatedAt) values ("17A",7,"A","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("17B",7,"B","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("17C",7,"C","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("17D",7,"D","2023-06-03 14:25:49");

insert into sms.section (id,gradeId, name,updatedAt) values ("18A",8,"A","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("18B",8,"B","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("18C",8,"C","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("18D",8,"D","2023-06-03 14:25:49");

insert into sms.section (id,gradeId, name,updatedAt) values ("19A",9,"A","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("19B",9,"B","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("19C",9,"C","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("19D",9,"D","2023-06-03 14:25:49");

insert into sms.section (id,gradeId, name,updatedAt) values ("110A",10,"A","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("110B",10,"B","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("110C",10,"C","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("110D",10,"D","2023-06-03 14:25:49");

insert into sms.section (id,gradeId, name,updatedAt) values ("111C",11,"C","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("111D",11,"D","2023-06-03 14:25:49");

insert into sms.section (id,gradeId, name,updatedAt) values ("112C",12,"C","2023-06-03 14:25:49");
insert into sms.section (id,gradeId, name,updatedAt) values ("112D",12,"D","2023-06-03 14:25:49");


-- Add Subject
insert into sms.subject (id,name, subjectCode,optional,updatedAt) values ("112DEnglish","English","1122",false,"2023-06-03 14:25:49");
insert into sms.subject (id,name, subjectCode,optional,updatedAt) values ("112DNepali","Nepali","2211",false,"2023-06-03 14:25:49");
insert into sms.subject (id,name, subjectCode,optional,updatedAt) values ("112DComputer","Computer","0011",false,"2023-06-03 14:25:49");
insert into sms.subject (id,name, subjectCode,optional,updatedAt) values ("112DBiology","Biology","0000",false,"2023-06-03 14:25:49");
insert into sms.subject (id,name, subjectCode,optional,updatedAt) values ("112DPhysics","Physics","3344",false,"2023-06-03 14:25:49");
insert into sms.subject (id,name, subjectCode,optional,updatedAt) values ("112DChemistry","Chemistry","9900",false,"2023-06-03 14:25:49");
insert into sms.subject (id,name, subjectCode,optional,updatedAt) values ("112DMathematics","Mathematics","8899",false,"2023-06-03 14:25:49");


-- Grading Scale Manager
insert into sms.GradingSystem (id,name, percentageFrom,percentageTo,point,remarks,updatedAt) values ("89A+","A+",89.00,100.00,4,"Outstanding","2023-06-03 14:25:49");
insert into sms.GradingSystem (id,name, percentageFrom,percentageTo,point,remarks,updatedAt) values ("79A","A",79.00,89.00,3.6,"Excellent","2023-06-03 14:25:49");
insert into sms.GradingSystem (id,name, percentageFrom,percentageTo,point,remarks,updatedAt) values ("69B+","B+",69.00,79.00,3.2,"Very Good","2023-06-03 14:25:49");
insert into sms.GradingSystem (id,name, percentageFrom,percentageTo,point,remarks,updatedAt) values ("59B","B",59.00,69.00,2.8,"Good","2023-06-03 14:25:49");
insert into sms.GradingSystem (id,name, percentageFrom,percentageTo,point,remarks,updatedAt) values ("49C+","C+",49.00,59.00,2.4,"Satisfying","2023-06-03 14:25:49");
insert into sms.GradingSystem (id,name, percentageFrom,percentageTo,point,remarks,updatedAt) values ("39C","C",39.00,49.00,2,"Poor","2023-06-03 14:25:49");
insert into sms.GradingSystem (id,name, percentageFrom,percentageTo,point,remarks,updatedAt) values ("34D","D",34.00,39.00,1.6,"Very Poor","2023-06-03 14:25:49");
insert into sms.GradingSystem (id,name, percentageFrom,percentageTo,point,remarks,updatedAt) values ("0NG","NG",0.00,34.00,0,"Must Improve","2023-06-03 14:25:49");
