DROP SCHEMA IF EXISTS BD cascade;

\c postgres

DROP DATABASE IF EXISTS arvector;

-- Create BD
create database arvector TEMPLATE template1;
-- FIN de Create BD

\c arvector;

-- Create Domain BD 
CREATE SCHEMA BD;
CREATE DOMAIN BD.type_name varchar(50); 
CREATE DOMAIN BD.type_last_name varchar(50);
CREATE DOMAIN BD.type_phone varchar(20);
CREATE DOMAIN BD.type_ci varchar(20);
CREATE DOMAIN BD.type_semester int CHECK (VALUE >= 1 AND VALUE <= 9);
CREATE DOMAIN BD.type_email text CHECK (VALUE ~ '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$');
CREATE DOMAIN BD.type_school varchar(11) check (VALUE in ('computacion','fisica','quimica','matematica','biologia'));
CREATE DOMAIN BD.type_Rol int check (VALUE in (1,2,3));
CREATE DOMAIN BD.type_nameRol varchar(7) check (VALUE in ('admin','student','teacher'));
-- FIN Create Domain BD

create table BD.roles(
	rol BD.type_Rol primary key,
	name_rol BD.type_nameRol
);

create table BD.career(
	code_career text primary key,
	school BD.type_school not null
);

create table BD.teacher(
	name BD.type_name not null,
	last_name BD.type_last_name not null,
	ci BD.type_ci primary key,
	email BD.type_email not null
);

create table BD.student(
	name BD.type_name not null,
	last_name BD.type_last_name not null,
	ci BD.type_ci primary key,
	email  BD.type_email not null,
	phone BD.type_phone
);

create table BD.careerStudent(
	code_career text,
	ci_student BD.type_ci,

	foreign key (code_career) references BD.career(code_career)
	on delete cascade
	on update cascade,

	foreign key (ci_student) references BD.student(ci)
	on delete cascade
	on update cascade,

	primary key(code_career,ci_student)
);

create table BD.asignature(
	name varchar(100) not null,
	code_asignature text primary key
);

create table BD.careerAsignature(
	code_career text,
	code_asignature text,

	foreign key (code_career) references BD.career(code_career)
	on delete cascade
	on update cascade,

	foreign key (code_asignature) references BD.asignature(code_asignature)
	on delete cascade
	on update cascade,

	primary key(code_career,code_asignature)
);

create table BD.teacherAsignature(
	name BD.type_name not null,
	last_name BD.type_last_name not null,
	ci_teacher BD.type_ci,
	code_asignature text,

	foreign key (ci_teacher) references BD.teacher(ci)
	on delete cascade
	on update cascade,

	foreign key (code_asignature) references BD.asignature(code_asignature)
	on delete cascade
	on update cascade,

	primary key(ci_teacher,code_asignature)
);

create table BD.studentAsignature(
	ci_student BD.type_ci,
	ci_teacher BD.type_ci,
	code_asignature text,

	foreign key (ci_student) references BD.student(ci)
	on delete cascade
	on update cascade,

	foreign key (code_asignature) references BD.asignature(code_asignature)
	on delete cascade
	on update cascade,

	primary key(ci_student,code_asignature)
);

create table BD.section(
	ci_teacher BD.type_ci,
	ci_student BD.type_ci,
	code_asignature text,
	num_section int,
	schedule text,

	foreign key (ci_teacher) references BD.teacher(ci)
	on delete cascade
	on update cascade,

	foreign key (ci_student) references BD.student(ci)
	on delete cascade
	on update cascade,

	primary key(ci_teacher,ci_student,num_section)
);

create table BD.guide(
	type_name BD.type_name,
	num_guide int,
	code_asignature text,
	ci_teacher BD.type_ci,

	foreign key (ci_teacher) references BD.teacher(ci)
	on delete cascade
	on update cascade,

	foreign key (code_asignature) references BD.asignature(code_asignature)
	on delete cascade
	on update cascade,

	primary key (code_asignature, num_guide, ci_teacher)
);

create table BD.resourceMarker(
	id serial,
	pattFileSrc text, 
	gltfFileSrc text, 
	code_asignature text, 
	num_guide int, 
	ci_teacher BD.type_ci,

	foreign key (code_asignature) references BD.asignature(code_asignature)
	on delete cascade
	on update cascade,

	foreign key (ci_teacher) references BD.teacher(ci)
	on delete cascade
	on update cascade,

	primary key(code_asignature, num_guide, ci_teacher, id)
);

create table BD.users(
	email BD.type_email,
	password text,
	rol BD.type_rol,

	foreign key (rol) references BD.roles(rol)
	on delete cascade
	on update cascade,

	primary key(email,password ,rol)
);

INSERT INTO BD.roles (rol, name_rol) VALUES (1, 'admin');
INSERT INTO BD.roles (rol, name_rol) VALUES (2, 'student');
INSERT INTO BD.roles (rol, name_rol) VALUES (3, 'teacher');

INSERT INTO BD.asignature (name, code_asignature) values ('cal. Vectorial', 'cal3');

INSERT INTO bd.career (code_career, school) VALUES ('1', 'computacion');
INSERT INTO bd.career (code_career, school) VALUES ('2', 'matematica');
INSERT INTO bd.career (code_career, school) VALUES ('3', 'quimica');
INSERT INTO bd.career (code_career, school) VALUES ('4', 'fisica');
INSERT INTO bd.career (code_career, school) VALUES ('5', 'biologia');