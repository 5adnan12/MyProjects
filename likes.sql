-- Create users table
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    username TEXT,
    role TEXT
);

-- Insert sample data into users table
INSERT INTO users (user_id, username, role) VALUES 
(1, 'John', 'author'),
(2, 'Jane', 'author'),
(3, 'Alice', 'admin'),
(4, 'Bob', 'author'),
(5, 'Emma', 'author');

-- Create posts table
CREATE TABLE posts (
    post_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    likes INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Insert sample data into posts table
INSERT INTO posts (post_id, user_id, likes) VALUES 
(101, 1, 20),
(102, 2, 15),
(103, 2, 30),
(104, 1, 10),
(105, 4, 25);

-- Create comments table
CREATE TABLE comments (
    comment_id INTEGER PRIMARY KEY,
    post_id INTEGER,
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

-- Insert sample data into comments table
INSERT INTO comments (comment_id, post_id) VALUES 
(1, 101),
(2, 102),
(3, 102),
(4, 104),
(5, 105);

SELECT 
    u.username,
    COUNT(DISTINCT p.post_id) AS total_posts,
    AVG(p.likes) AS avg_likes_per_post,
    SUM(c.comments) AS total_comments
FROM 
    users u
LEFT JOIN 
    posts p ON u.user_id = p.user_id
LEFT JOIN 
    (SELECT post_id, COUNT(*) AS comments FROM comments GROUP BY post_id) c ON p.post_id = c.post_id
WHERE 
    u.role = 'author'
GROUP BY 
    u.username
HAVING 
    total_posts > 10
ORDER BY 
    avg_likes_per_post DESC;
