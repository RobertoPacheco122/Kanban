CREATE TABLE boards (
  id_board SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE lists (
  id_list SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  id_board INT NOT NULL,
  FOREIGN KEY (id_board) REFERENCES boards (id_board),
  is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE tasks (
	id_task SERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	description TEXT NOT NULL,
	done BOOLEAN NOT NULL,
	id_list INT NOT NULL,
	FOREIGN KEY (id_list) REFERENCES lists (id_list),
  is_deleted BOOLEAN DEFAULT false,
  priority TEXT CHECK (priority IN ('Low Priority', 'Mid Priority', 'High Priority')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date TIMESTAMP
);

create table tags (
  id_tag SERIAL PRIMARY KEY,
  name VARCHAR(30),
  color_hexa VARCHAR(7)
)

CREATE TABLE tasks_responsables (
  id_user INT NOT NULL,
  id_task INT NOT NULL,
  FOREIGN KEY (id_user) REFERENCES users (id_user),
  FOREIGN KEY (id_task) REFERENCES tasks (id_task)
);

CREATE TABLE tasks_tags (
  id_task INT NOT NULL,
  id_tag INT NOT NULL,
  FOREIGN KEY (id_task) REFERENCES tasks (id_task),
  FOREIGN KEY (id_tag) REFERENCES tags (id_tag)
)

CREATE TABLE subtasks (
	id_subtask SERIAL PRIMARY KEY,
	description TEXT NOT NULL,
	done BOOLEAN NOT NULL,
	id_task INT NOT NULL,
	FOREIGN KEY (id_task) REFERENCES tasks (id_task),
  is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE users (
  id_user SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_deleted BOOLEAN DEFAULT false
);