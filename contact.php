<?php
header('Content-Type: application/json');

// Configuration de la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "portfolio_contacts";

// Configuration de l'email
$to = "falloutambedou05@gmail.com";
$subject = "Nouveau message depuis le portfolio";

// Créer une connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données.']);
    exit;
}

// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Préparer et exécuter la requête d'insertion
    $stmt = $conn->prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $message);

    if ($stmt->execute()) {
        // Préparer le contenu de l'email
        $email_content = "Nouveau message depuis le portfolio :\n\n";
        $email_content .= "Nom: $name\n";
        $email_content .= "Email: $email\n";
        $email_content .= "Message:\n$message\n";

        // En-têtes de l'email
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        // Envoyer l'email
        if (mail($to, $subject, $email_content, $headers)) {
            echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Message enregistré mais erreur lors de l\'envoi de l\'email.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi du message.']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
}

$conn->close();
?>
