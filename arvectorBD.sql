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
	email BD.type_email not null,
);

create table BD.student(
	name BD.type_name not null,
	last_name BD.type_last_name not null,
	ci BD.type_ci primary key,
	semester BD.type_semester not null,
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
	exercise_number int,
	path_guide text,
	num_guide int,
	code_asignature text, 
	num_section int,

	foreign key (code_asignature) references BD.asignature(code_asignature)
	on delete cascade
	on update cascade,

	primary key (code_asignature,num_section,num_guide)
);

create table BD.resourceMarker(
	id int,
	name_src text,
	num_guide int,
	code_asignature text,
	path_marker text,
	path_resource text,
	date_created timestamp,

	foreign key (code_asignature) references BD.asignature(code_asignature)
	on delete cascade
	on update cascade,

	primary key(code_asignature,num_guide,id)
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

-- Teacher
INSERT INTO BD.teacher (name,last_name,ci,email,phone) VALUES ('Jasper','Collins','149534539','ante.Vivamus@Sed.com','58-945-124-0952'),('Clark','Sawyer','245224597','velit.in@felisadipiscing.ca','58-301-825-5110'),('Christian','Gordon','855230850','gravida.Praesent.eu@Integersemelit.ca','58-701-423-3485'),('Baxter','Wynn','007539372','nec@AeneanmassaInteger.net','58-158-876-6595'),('Nell','Roy','051826808','sit.amet@fringilla.net','58-465-659-4032'),('Clio','Wolf','210224671','odio.tristique@volutpatornarefacilisis.org','58-289-376-3839'),('Hu','Mccarthy','227974060','urna.convallis.erat@estmollisnon.edu','58-223-225-0876'),('Robert','Adkins','159968247','Integer.urna@sem.org','58-609-455-5111'),('Leroy','Figueroa','243311784','habitant@acmattisvelit.net','58-779-923-4282'),('Seth','Bryant','613434794','ipsum.dolor@vel.org','58-340-693-8958');
INSERT INTO BD.teacher (name,last_name,ci,email,phone) VALUES ('Alfonso','Miles','202511358','quis.accumsan@Innecorci.com','58-561-284-0660'),('Isaac','Moss','280810813','diam@sempertellus.ca','58-296-427-9116'),('Herrod','Davenport','188386148','tincidunt.pede.ac@tristique.org','58-966-399-1790'),('Oren','Howard','223362260','et.rutrum@Etiam.edu','58-847-393-1540'),('Cherokee','Huber','396373045','enim@nullaanteiaculis.ca','58-366-651-4584'),('Gloria','Pitts','772078036','blandit.enim.consequat@sedleoCras.edu','58-961-600-1347'),('Byron','Cole','990151680','luctus.ut@Nunc.com','58-995-464-4246'),('Phoebe','Frye','866181340','nunc.In.at@imperdietnon.ca','58-371-222-5586'),('Montana','Charles','406540773','nulla.ante.iaculis@risus.ca','58-266-572-0407'),('Azalia','Harrell','485370902','euismod.est.arcu@nisiaodio.co.uk','58-202-951-1690');
INSERT INTO BD.teacher (name,last_name,ci,email,phone) VALUES ('Abigail','Mcbride','938076056','ornare.egestas.ligula@semelit.co.uk','58-754-645-5911'),('Bell','Bailey','611877002','ut.mi.Duis@magna.com','58-519-812-3646'),('Jelani','Mcclure','668289036','diam@euturpisNulla.org','58-494-188-0689'),('Chaney','Buckley','424511228','sapien.Aenean@tempor.ca','58-309-848-0085'),('Hedda','Herman','758822746','ultrices.posuere.cubilia@liberoMorbiaccumsan.co.uk','58-219-117-4674'),('Jackson','Best','401432992','Donec@utpharetra.edu','58-656-536-4250'),('Hilda','Singleton','331662494','accumsan@Quisque.org','58-639-638-1589'),('Drew','Ramos','740181706','lectus.Cum@leo.co.uk','58-952-739-3502'),('Sandra','Melendez','842042376','ridiculus.mus.Aenean@nec.edu','58-688-616-8108'),('Marny','Erickson','223373671','Praesent@lectussitamet.co.uk','58-482-325-0489');
INSERT INTO BD.teacher (name,last_name,ci,email,phone) VALUES ('Ryder','Harrington','111640827','nascetur.ridiculus.mus@pedePraesenteu.ca','58-980-217-0465'),('Dane','Dominguez','484647','netus.et.malesuada@tincidunttempusrisus.org','58-797-774-3678'),('Meredith','Kemp','017972761','viverra@urnaNuncquis.net','58-754-417-3228'),('Jackson','Mathews','993918218','congue.In@ultricesVivamusrhoncus.edu','58-858-285-8960'),('Quinn','Poole','514743160','Nulla@tinciduntcongueturpis.ca','58-906-848-7698'),('Amena','Shaffer','557648813','urna.justo@et.net','58-987-215-7612'),('Eagan','Martinez','813028958','nec.quam.Curabitur@a.com','58-292-429-4088'),('Henry','Welch','894143866','Sed.nunc.est@turpisNullaaliquet.com','58-371-830-6540'),('Clarke','Mcclure','225547447','adipiscing.elit@dolorDonec.ca','58-301-570-4028'),('Reece','Stephens','696662501','Ut.sagittis.lobortis@diamdictumsapien.com','58-500-603-1285');
INSERT INTO BD.teacher (name,last_name,ci,email,phone) VALUES ('Avram','Richardson','741759781','Nullam.feugiat.placerat@MaurismagnaDuis.edu','58-843-232-0583'),('Tallulah','Gardner','911248276','Ut.semper@congue.net','58-615-610-2014'),('Gary','Gaines','710672411','tristique.neque.venenatis@mollisnec.com','58-781-502-4298'),('Melvin','Deleon','481990158','quis.diam@in.edu','58-638-676-9118'),('Craig','Cabrera','676276637','adipiscing.elit@Intinciduntcongue.ca','58-557-238-1424'),('Camden','Clayton','682960604','imperdiet@Uttincidunt.com','58-215-570-7073'),('Evangeline','Cooper','038105052','magna.Praesent@semper.edu','58-718-175-8803'),('Patience','Henderson','924408164','nulla.vulputate@fermentum.co.uk','58-251-268-9330'),('Piper','Morales','073852519','mattis.ornare.lectus@dui.com','58-858-471-4327'),('Carlos','Rogers','382811354','nibh.sit.amet@dolornonummy.co.uk','58-704-902-1687');
INSERT INTO BD.teacher (name,last_name,ci,email,phone) VALUES ('Leslie','Hill','453654337','consequat.lectus@duinectempus.edu','58-425-770-3988'),('Olivia','Hahn','662335025','Maecenas.malesuada@orciluctus.co.uk','58-284-464-6143'),('Yolanda','Cline','095639142','semper.egestas.urna@aliquetliberoInteger.ca','58-794-286-5191'),('Meghan','Trujillo','939061792','fringilla.Donec@tempusnon.ca','58-685-231-7836'),('Dolan','Mcmillan','991629122','Proin.nisl.sem@aceleifendvitae.edu','58-946-794-2624'),('Talon','Freeman','841853161','eleifend.nec@lacus.org','58-634-385-6379'),('Isaiah','Burke','395076821','Aenean.massa@ac.co.uk','58-232-360-9861'),('Naida','Owen','743039513','enim.Etiam.imperdiet@etrisusQuisque.com','58-809-242-5083'),('Cameron','Carlson','699454484','vitae@erosnon.edu','58-577-409-5276'),('Zahir','Skinner','737625707','at.sem@tellusPhaselluselit.edu','58-853-904-6172');
INSERT INTO BD.teacher (name,last_name,ci,email,phone) VALUES ('Christopher','Maxwell','660237132','nec@nonenim.edu','58-713-182-8163'),('Lawrence','Gallagher','091081661','consectetuer.adipiscing.elit@luctusipsum.edu','58-406-805-5028'),('Willa','Parsons','977103704','vulputate.lacus.Cras@aliquet.ca','58-216-247-3693'),('Cyrus','Roman','744903782','molestie@magnis.co.uk','58-410-237-2419'),('Constance','Solomon','993752690','tortor.dictum@Cumsociisnatoque.net','58-151-293-3213'),('Ginger','Swanson','688435254','nunc@bibendumDonecfelis.edu','58-375-694-9590'),('Jermaine','Patrick','423594118','ridiculus.mus@Donec.ca','58-575-432-9809'),('Jermaine','Levy','439615394','non@vulputateeu.org','58-335-508-2018'),('Tate','Terrell','327953030','diam.Duis.mi@pretiumaliquetmetus.ca','58-964-274-0583'),('Grant','Oconnor','801609801','purus.ac.tellus@convallisin.edu','58-169-167-9799');
INSERT INTO BD.teacher (name,last_name,ci,email,phone) VALUES ('Nina','Austin','458653615','arcu.Sed.eu@iaculisodio.ca','58-512-527-4299'),('Wendy','Peterson','615721644','erat.Etiam@ultricesDuisvolutpat.org','58-639-653-9249'),('Camille','Thornton','193201696','molestie.dapibus.ligula@nec.co.uk','58-483-901-1834'),('Vivien','Combs','319379632','augue.eu.tempor@acmattis.ca','58-277-391-0744'),('Jelani','Morton','546907445','erat@velturpis.net','58-104-674-7730'),('Kirk','Burgess','671907103','id.sapien.Cras@lectusNullamsuscipit.co.uk','58-536-586-7100'),('Kameko','Melton','981507874','In.ornare@rhoncusProinnisl.com','58-703-904-3390'),('Ronan','Dale','573149713','egestas.Aliquam@vel.ca','58-643-554-3672'),('Brenna','Mclaughlin','712248582','luctus@dolorvitae.ca','58-744-826-1611'),('Clare','Hinton','709944185','lectus.pede.et@ac.co.uk','58-461-686-3434');
INSERT INTO BD.teacher (name,last_name,ci,email,phone) VALUES ('Isaiah','Rush','593967433','in.magna@sitamet.org','58-741-984-4688'),('Desirae','Bond','641747696','Nam.tempor.diam@eu.org','58-408-201-3757'),('Peter','Holcomb','907439897','aliquet@ut.org','58-948-223-7571'),('Virginia','Williams','123008484','enim.nisl.elementum@imperdiet.edu','58-155-326-3472'),('Claire','Mercado','257670257','tincidunt.Donec.vitae@loremsitamet.net','58-402-296-2610'),('Heather','Wiley','163421571','ridiculus.mus@enim.net','58-890-504-3696'),('Lacey','Matthews','162895577','lectus.rutrum.urna@nec.org','58-112-811-4141'),('Keiko','Norris','953734373','et.ipsum@luctusaliquetodio.ca','58-320-125-9561'),('Tanek','Harper','272697814','et.lacinia@non.edu','58-784-818-9888'),('Maryam','Hughes','901665547','molestie.orci.tincidunt@Inscelerisque.com','58-503-331-7228');
INSERT INTO BD.teacher (name,last_name,ci,email,phone) VALUES ('Kirk','Hutchinson','503428724','bibendum.ullamcorper@Duis.ca','58-833-685-6967'),('Byron','Fowler','900686593','ipsum@massaSuspendisse.com','58-819-786-3036'),('Porter','Montoya','186649497','Fusce@semconsequatnec.org','58-692-479-8671'),('India','Miller','469072821','felis.orci@at.com','58-740-592-8777'),('Clayton','Baird','211476361','mauris@nonjusto.org','58-392-344-5922'),('Nadine','Ferguson','714335379','ipsum.leo@ullamcorperviverraMaecenas.edu','58-869-844-9300'),('Candice','Bird','328456363','nunc.sed.pede@congue.org','58-790-865-2095'),('Kenneth','Ortega','586766115','ipsum.primis@nislelementumpurus.com','58-159-253-3514'),('Ulric','Sanders','943441055','ante.blandit.viverra@convallisantelectus.co.uk','58-554-343-5430'),('Jack','Mcdaniel','648728236','porttitor.eros@pretium.net','58-677-588-7967');

-- Student
INSERT INTO BD.student (name, last_name, ci, semester, email, phone) values ('gregory','perez','20242434',10,'gregory.facyt@gmail.com','04128463294');
INSERT INTO BD.student (name,last_name,ci,semester,email,phone) VALUES ('Keelie','Arnold','762085629',1,'mi.eleifend.egestas@elitCurabitur.com','58-645-728-7655'),('Gay','Knowles','596956938',3,'tincidunt.tempus@tempusrisusDonec.com','58-841-795-8548'),('Reece','Torres','279977557',1,'ultricies.adipiscing@eu.net','58-876-303-6442'),('Cairo','Leblanc','029400363',1,'at.sem.molestie@tinciduntadipiscingMauris.net','58-751-146-9192'),('Hamish','Palmer','164213209',3,'enim.nisl.elementum@liberoestcongue.net','58-464-868-5024'),('Uriel','Carpenter','672240108',8,'massa@sedleo.edu','58-602-682-5977'),('Gail','Mcfadden','169247475',5,'euismod.enim.Etiam@vestibulum.org','58-910-177-9449'),('Florence','Bradshaw','878750397',4,'magna@Aliquam.ca','58-887-863-9564'),('Kameko','Burke','364419283',8,'dictum.magna.Ut@amet.ca','58-781-760-3899'),('Cullen','Bryant','255928707',7,'urna@elit.net','58-133-382-9499');
/*INSERT INTO BD.student (name,last_name,ci,semester,email,phone) VALUES ('Cailin','Barker','251023396',9,'lorem.fringilla@non.org','58-203-274-4759'),('Margaret','Case','332435510',10,'vel.mauris@sapienmolestie.org','58-610-496-7353'),('Stewart','Rivas','955957709',9,'pede.ultrices.a@orci.edu','58-425-296-4210'),('Lillith','Stewart','798979795',4,'pharetra.felis@sit.ca','58-813-614-5269'),('Hu','Snyder','851057711',2,'a.odio@consectetuereuismod.org','58-580-589-8406'),('Plato','Byrd','040943128',6,'elementum@velitduisemper.ca','58-855-823-6749'),('Brennan','Reese','069200459',9,'Morbi.neque@purus.co.uk','58-919-742-7373'),('Brynn','Farley','096570221',3,'dolor.sit@metusIn.net','58-565-653-5868'),('Levi','Wolf','253833537',8,'placerat.augue.Sed@nislMaecenas.ca','58-212-757-1968'),('Rowan','Hines','643287147',5,'ut@bibendum.edu','58-150-212-5195');
INSERT INTO BD.student (name,last_name,ci,semester,email,phone) VALUES ('Sage','Mcintyre','322765447',8,'ac@Integer.co.uk','58-381-141-4812'),('Nasim','Schultz','295239941',5,'accumsan.convallis@Proinmi.co.uk','58-324-358-8455'),('Willa','Cochran','715841672',8,'erat.volutpat.Nulla@ipsumnuncid.org','58-638-147-8170'),('Carl','Watkins','006144091',5,'ut.pharetra.sed@egestasurna.ca','58-793-832-0496'),('Macon','Solis','399639186',10,'quis@Morbimetus.co.uk','58-396-131-4576'),('Gillian','Lott','436438675',10,'eros.non@sapien.edu','58-902-608-6549'),('Adele','Le','585450646',3,'vitae@euismod.co.uk','58-325-844-7461'),('Beck','Carter','958010407',4,'Nullam.feugiat@odio.net','58-680-139-4535'),('Baker','Langley','220702757',3,'sed.sem@Quisquelibero.ca','58-917-406-8896'),('Roary','Lambert','177982220',1,'eu.neque@Vivamusrhoncus.com','58-383-108-6583');
INSERT INTO BD.student (name,last_name,ci,semester,email,phone) VALUES ('Chester','Kelley','427607262',3,'fermentum.risus@feugiatnecdiam.co.uk','58-951-674-7119'),('Emi','Stout','053623815',2,'orci.Phasellus.dapibus@accumsanconvallis.co.uk','58-589-930-7002'),('Tyler','Mcintyre','881994768',7,'facilisis.facilisis@interdumliberodui.co.uk','58-121-919-0186'),('Tasha','Mullins','212833511',7,'malesuada@ridiculusmus.edu','58-155-374-0472'),('Yoshi','Reynolds','156601130',8,'ac.risus.Morbi@Inornare.com','58-830-605-4891'),('Lars','Clark','695338723',1,'Praesent.eu@morbi.net','58-701-638-1557'),('Nadine','Vance','512227174',4,'urna.nec@antedictum.ca','58-161-996-1890'),('Isaac','Crawford','954822938',5,'tellus.imperdiet@in.com','58-993-607-7110'),('Hadassah','Ewing','571753995',4,'eu.ultrices@atvelit.co.uk','58-606-671-6671'),('Shay','Heath','293321048',8,'erat.volutpat@porttitor.com','58-172-877-0850');
INSERT INTO BD.student (name,last_name,ci,semester,email,phone) VALUES ('Macey','Mcclain','594524969',10,'magna.et.ipsum@Maecenas.edu','58-601-503-2448'),('Amos','Christian','267970929',8,'malesuada.Integer.id@nascetur.co.uk','58-917-876-4332'),('Lionel','Bryant','171624604',10,'amet.orci@nonmassanon.edu','58-437-761-7696'),('Diana','Decker','003066800',6,'Phasellus.vitae.mauris@in.com','58-427-964-1081'),('Colt','Nguyen','056445026',7,'porttitor.interdum.Sed@natoquepenatibuset.com','58-578-916-6723'),('Yvonne','Dorsey','624387288',7,'luctus.vulputate.nisi@tincidunt.org','58-366-989-4033'),('Candice','Sykes','542965371',9,'iaculis@aenimSuspendisse.org','58-533-423-1574'),('Danielle','Weaver','837496611',4,'lectus.a.sollicitudin@estNuncullamcorper.edu','58-927-700-0979'),('Norman','Horton','673095436',7,'pellentesque.a.facilisis@nuncsitamet.edu','58-582-168-7605'),('Matthew','Mack','273484824',10,'nulla.Integer.urna@idsapien.co.uk','58-409-337-9832');
INSERT INTO BD.student (name,last_name,ci,semester,email,phone) VALUES ('Steven','Dickson','315189621',4,'lectus@euaccumsansed.com','58-240-803-3699'),('Jenna','Lynch','998435291',10,'interdum.feugiat@sit.ca','58-753-790-4966'),('Kamal','Rodriguez','932405939',3,'Aliquam@scelerisque.com','58-472-268-6795'),('Ferdinand','Schmidt','016364853',5,'orci@luctussitamet.ca','58-514-369-7816'),('Kane','Yang','954544854',4,'blandit.at.nisi@eratinconsectetuer.net','58-254-724-0942'),('Jescie','Palmer','512647652',10,'hymenaeos.Mauris@pellentesquemassalobortis.com','58-861-313-4709'),('Clarke','Alexander','933900516',4,'congue.elit@lorem.com','58-315-322-0695'),('Jennifer','Levy','453926578',7,'eu.dui@Nuncsed.net','58-661-153-9261'),('Axel','Fitzpatrick','558174710',2,'Duis@Maurisut.co.uk','58-259-357-0132'),('Brenden','Castillo','491450417',7,'Etiam@odio.ca','58-825-178-2556');
INSERT INTO BD.student (name,last_name,ci,semester,email,phone) VALUES ('Clarke','Simon','745652545',1,'et.malesuada@Maecenasornare.com','58-360-840-7424'),('Tobias','Knight','601120900',6,'nunc.risus.varius@sit.org','58-128-790-9903'),('Orli','Wilkinson','868570615',4,'Morbi.sit.amet@Fuscedolor.co.uk','58-217-955-3453'),('Tasha','Bowen','708803663',2,'tristique.senectus@nuncullamcorpereu.com','58-274-317-7022'),('Barry','Miranda','686200890',4,'Integer.eu.lacus@auctor.net','58-362-974-5870'),('Oliver','Sexton','726748304',9,'sed.dui.Fusce@duiCras.co.uk','58-327-749-2765'),('Raven','Herman','153840723',10,'lacus.Nulla@libero.ca','58-429-894-2345'),('Aline','Duke','274002922',3,'eget.lacus@utsemNulla.edu','58-833-993-7970'),('Iola','Finch','365219575',2,'lorem@utodio.edu','58-210-213-8517'),('Rana','Flynn','891682312',8,'gravida.molestie@in.org','58-529-526-7634');
INSERT INTO BD.student (name,last_name,ci,semester,email,phone) VALUES ('Hermione','Mcleod','158750372',2,'aliquam.eu.accumsan@magnaetipsum.com','58-472-712-2382'),('Shana','Herrera','422165282',7,'torquent.per@lacusCras.ca','58-296-210-0510'),('Paloma','Drake','364851113',6,'tellus@nonummy.edu','58-123-475-9358'),('Jonas','Macdonald','777660697',7,'eget@maurisaliquameu.co.uk','58-264-108-8024'),('Gray','Montoya','550244313',2,'habitant@adipiscingenimmi.org','58-370-598-2014'),('Xander','Keller','470679051',3,'eu.euismod@atvelitPellentesque.co.uk','58-442-603-3644'),('Amy','Owens','547583849',4,'egestas@estvitaesodales.edu','58-567-676-6884'),('Kirsten','Briggs','598654788',2,'libero.lacus@tempusnonlacinia.edu','58-405-519-4736'),('Cailin','Harper','847163458',1,'Morbi.quis.urna@gravidaPraesent.ca','58-858-494-7474'),('Mikayla','Parrish','667687719',4,'dis.parturient@Nunc.co.uk','58-851-363-2545');
INSERT INTO BD.student (name,last_name,ci,semester,email,phone) VALUES ('Nissim','Pollard','895090330',4,'enim@Sedauctor.com','58-879-766-3608'),('Bryar','Williams','599907201',8,'id.sapien@luctusetultrices.ca','58-643-941-0139'),('Adam','Wells','037285533',5,'vulputate.mauris.sagittis@Crasegetnisi.ca','58-251-582-3696'),('Brent','Sanders','290898162',4,'Etiam.bibendum.fermentum@arcuSedet.com','58-255-992-0695'),('Teegan','Tillman','542326855',4,'vel@Nulla.com','58-762-752-1707'),('Suki','Wise','037056728',10,'lorem.vehicula.et@risusMorbi.com','58-339-839-0275'),('Selma','Russo','179818380',6,'habitant.morbi@lacusvariuset.com','58-644-512-7003'),('India','Cervantes','727202459',4,'convallis.dolor@laoreetliberoet.ca','58-542-354-5587'),('Aline','Alston','485332837',3,'ipsum.non@pharetraut.ca','58-168-822-4943'),('Lars','Rutledge','997329529',5,'lacinia@aliquet.net','58-971-938-4814');
INSERT INTO BD.student (name,last_name,ci,semester,email,phone) VALUES ('Calvin','Adkins','551664584',7,'pede@duiquis.co.uk','58-595-671-2712'),('Dillon','French','865490155',9,'metus.sit@ornarelectus.edu','58-120-860-6419'),('Charles','Mason','072261282',8,'massa.Quisque@pharetrautpharetra.com','58-352-918-9262'),('Zelda','Woodward','409961307',9,'leo@loremsemperauctor.edu','58-144-852-9688'),('Renee','Hendrix','184541027',6,'vitae@tinciduntnibh.net','58-232-745-3505'),('Tate','Small','377952445',3,'Donec.feugiat.metus@duiquisaccumsan.net','58-282-181-9791'),('Allen','Hines','878883107',4,'urna@dictummi.co.uk','58-406-591-4083'),('Hiroko','Aguilar','090904483',5,'velit@atvelitCras.org','58-967-277-5950'),('Beau','Patterson','165456641',10,'non@penatibusetmagnis.org','58-487-947-0773'),('Moses','Rodgers','149155343',3,'Ut@Maurisut.org','58-164-415-0512');*/

-- Asignature
INSERT INTO BD.asignature (name,code_asignature) VALUES ('Integer vulputate,','60615416599'),('elit, pretium','78808471299'),('fermentum convallis','45357565099'),('inceptos hymenaeos.','82525848899'),('ornare tortor','54577410299'),('laoreet, libero','19913004499'),('in, cursus','99571901499'),('sit amet','99583631599'),('ut, molestie','81513782699'),('convallis ligula.','18615945399');
/*INSERT INTO BD.asignature (name,code_asignature) VALUES ('Duis a','42327763299'),('eu, euismod','23838894199'),('Sed nunc','97977681999'),('ligula elit,','41706399699'),('ligula. Aenean','68862402299'),('id, erat.','74263665599'),('nunc sit','47827130499'),('tincidunt vehicula','64486286299'),('Sed congue,','33363518299'),('Aliquam nisl.','11362676399');
INSERT INTO BD.asignature (name,code_asignature) VALUES ('est ac','55316396399'),('a ultricies','42543372199'),('id, mollis','94752544999'),('arcu. Vestibulum','13458723999'),('luctus ut,','57875467699'),('hendrerit id,','41576203099'),('aliquet lobortis,','70275018299'),('sem, vitae','81899927799'),('in felis.','13359915399'),('Nunc ut','66639382999');
INSERT INTO BD.asignature (name,code_asignature) VALUES ('Suspendisse sagittis.','97808547599'),('Proin dolor.','34529527599'),('magnis dis','13827282199'),('condimentum. Donec','67474386099'),('ut, pellentesque','61738991799'),('dolor, tempus','08677925699'),('vel sapien','60467727599'),('justo. Proin','12971806999'),('a odio','63940456199'),('dui. Cras','00460122699');
INSERT INTO BD.asignature (name,code_asignature) VALUES ('velit. Aliquam','41324597499'),('ut erat.','47753531099'),('erat eget','13537678499'),('Nulla facilisi.','91283334299'),('augue malesuada','14656603399'),('dolor quam,','96747379799'),('non justo.','35441596999'),('pellentesque, tellus','26886233499'),('vel, vulputate','31653641399'),('at, iaculis','88646182699');
INSERT INTO BD.asignature (name,code_asignature) VALUES ('fermentum fermentum','09388577499'),('malesuada vel,','59974768799'),('Aenean euismod','50459583299'),('malesuada vel,','68678665599'),('lectus justo','05515098799'),('eu augue','93219866899'),('Nulla eu','59382901199'),('Pellentesque ultricies','65961624199'),('eu augue','60535682699'),('et magnis','72727321299');
INSERT INTO BD.asignature (name,code_asignature) VALUES ('sit amet,','79436618699'),('enim non','00668101499'),('scelerisque sed,','07303567199'),('magna. Suspendisse','08590997299'),('arcu iaculis','19686509799'),('eleifend nec,','40472978699'),('at augue','74361486899'),('tincidunt pede','14902299599'),('Pellentesque habitant','97982061399'),('amet risus.','45215024199');
INSERT INTO BD.asignature (name,code_asignature) VALUES ('vulputate, posuere','75960113199'),('sapien. Nunc','78461974299'),('justo faucibus','89243739399'),('mauris eu','83879646199'),('magna. Cras','19841378099'),('tristique neque','95921726299'),('metus. Aenean','04657450099'),('eu, odio.','73426385299'),('tellus, imperdiet','91468795999'),('sit amet','66685698199');
INSERT INTO BD.asignature (name,code_asignature) VALUES ('Duis risus','72754167999'),('in consequat','7880847129'),('sem, consequat','97416495999'),('eleifend egestas.','94669778599'),('Sed auctor','70677864499'),('sagittis semper.','33298047499'),('faucibus. Morbi','28226467999'),('tincidunt congue','68702689399'),('Nunc quis','74772419699'),('luctus et','61423788299');
INSERT INTO BD.asignature (name,code_asignature) VALUES ('sem elit,','34782077099'),('elementum purus,','23838894197'),('imperdiet non,','95916099'),('vestibulum lorem,','83882744399'),('a neque.','92992765499'),('eget metus.','35456004999'),('vehicula et,','41623439699'),('mollis. Integer','13584832499'),('ipsum. Suspendisse','91809292399'),('Nunc ut','21488938699');*/

--Section
INSERT INTO BD.section (ci_teacher,ci_student,code_asignature,num_section,schedule) VALUES ('149534539','20242434','78808471299',8,'%B6453276757337949^DavidHardin^26014707?6'),('202511358','762085629','23838894199',4,'%B201463955882227^ReneeGood^07079481889? '),('938076056','596956938','42543372199',7,'%B5548738586830070^VladimirNash^25035622599? '),('111640827','279977557','34529527599',7,'%B180008354400959^IvanaPeters^0006113155? '),('741759781','029400363','42543372199',4,'%B4929624737017^JoyMorse^2905125901? '),('453654337','164213209','34529527599',9,'%B5338107157381166^IvanaKirk^77014415246?8'),('660237132','672240108','97416495999',1,'%B589372896334^ShannonFlores^21047261678? '),('458653615','169247475','95916099',4,'%B343014609873739^IfeomaCarroll^1904322553? '),('593967433','878750397','97977681999',3,'%B5641823435992150^HardingAtkins^18126443582? '),('503428724','255928707','94752544999',10,'%B30167761990028^PatienceWeaver^15017376?5');

--Guide
INSERT INTO BD.guide (type_name,exercise_number,path_guide,num_guide,code_asignature,num_section) VALUES ('guia 1 vectorial',10,'http://resource',5,'78808471299',1), ('guia 1 vectorial',10,'http://resource',4,'78808471299',1), ('guia 1 vectorial',10,'http://resource',3,'78808471299',1), ('guia 1 vectorial',10,'http://resource',2,'78808471299',1), ('guia 1 vectorial',10,'http://resource',1,'78808471299',1);

--ResourceMarker
INSERT INTO BD.resourceMarker (id,name_src,num_guide,code_asignature,path_marker,path_resource,date_created) VALUES (1,'marker xyz',1,'78808471299','http://resource_marker','http://resource_resource','2008/12/31 13:00:00.59'),(2,'marker xyz',1,'78808471299','http://resource_marker','http://resource_resource','2009/12/31 13:00:00.59'),(3,'marker xyz',1,'78808471299','http://resource_marker','http://resource_resource','2010/12/31 13:00:00.59'),(4,'marker xyz',1,'78808471299','http://resource_marker','http://resource_resource','2011/12/31 13:00:00.59'),(5,'marker xyz',1,'78808471299','http://resource_marker','http://resource_resource','2012/12/31 13:00:00.59');

--Career
INSERT INTO BD.career (code_career,school) VALUES ('1','quimica'),('2','fisica'),('3','matematica'),('4','biologia'),('5','computacion');

--CareerStudent
INSERT INTO BD.careerStudent (code_career,ci_student) VALUES ('1','762085629'),('2','596956938'),('2','279977557'),('4','029400363'),('5','164213209'),('1','672240108'),('2','169247475'),('3','878750397'),('4','364419283');

--CareerAsignature
INSERT INTO BD.careerAsignature(code_career,code_asignature) VALUES ('1','60615416599'),('2','78808471299'),('3','45357565099'),('4','82525848899'),('5','54577410299'),('1','19913004499'),('2','99571901499'),('3','99583631599'),('4','81513782699');
