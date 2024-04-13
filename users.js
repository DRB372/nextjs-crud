// db.js
const { Client } = require('neon');
const dbConfig = require('./dbConfig');

const client = new Client(dbConfig);

async function getUsers() {
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM users');
    return result.rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Error fetching users');
  } finally {
    await client.end();
  }
}

async function getUserById(id) {
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0]; // Assuming the query returns only one user or undefined
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw new Error(`Error fetching user with ID ${id}`);
  } finally {
    await client.end();
  }
}

async function createUser(user) {
  try {
    await client.connect();
    const result = await client.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [user.name, user.email]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Error creating user');
  } finally {
    await client.end();
  }
}

async function updateUser(id, user) {
  try {
    await client.connect();
    const result = await client.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [user.name, user.email, id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw new Error(`Error updating user with ID ${id}`);
  } finally {
    await client.end();
  }
}

async function deleteUser(id) {
  try {
    await client.connect();
    await client.query('DELETE FROM users WHERE id = $1', [id]);
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw new Error(`Error deleting user with ID ${id}`);
  } finally {
    await client.end();
  }
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
