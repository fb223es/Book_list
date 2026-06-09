<?php
error_reporting(E_ALL & ~E_DEPRECATED);

require __DIR__ . '/../vendor/autoload.php';

use Slim\App;
use Dotenv\Dotenv;

// Ladda .env
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// Config först
$config = [
    'settings' => [
        'displayErrorDetails' => true
    ]
];

// Skapa app med config
$app = new App($config);

// Hämta container
$container = $app->getContainer();

// Lägg till DB i container med miljövariabler
$container['db'] = function ($c) {
    return new mysqli(
        $_ENV['DB_HOST'],
        $_ENV['DB_USER'],
        $_ENV['DB_PASS'],
        $_ENV['DB_NAME']
    );
};

// Route-exempel
$app->get('/api/test', function ($req, $res) {
    return $res->write("Fungerar!");
});

// Route: Hämta alla böcker från tabellen "books"
$app->get('/api/books', function ($req, $res) use ($container) {
    $db = $container['db'];

    $result = $db->query("SELECT * FROM read_2024");

    $books = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $books[] = $row;
        }
    }

    $payload = json_encode($books);

    $res->getBody()->write($payload);
    return $res->withHeader('Content-Type', 'application/json');
});

//Hämta alla författare
$app->get('/api/authors', function ($req, $res) use ($container) {
    $db = $container['db'];

    $result = $db->query("SELECT * FROM authors");

    $authors = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $authors[] = $row['author_name']; 
        }
    }

    $uniqueAuthors = array_unique($authors);

    $data = [
        'authors' => $authors,
        'unique_count' => count($uniqueAuthors)
    ];

    $res->getBody()->write(json_encode($data));
    return $res->withHeader('Content-Type', 'application/json');
});

//Info för alla kort
$app->get('/api/booksall', function ($req, $res) use ($container) {
    $db = $container['db'];

    $result = $db->query("SELECT 
    b.book_title,
    a.author_name,
    b.rating
    FROM read_2024 b
    JOIN authors a ON b.author_id = a.author_id");

    $books = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $books[] = $row;
        }
    }

    $payload = json_encode($books);

    $res->getBody()->write($payload);
    return $res->withHeader('Content-Type', 'application/json');
});


// Starta appen
$app->run();
