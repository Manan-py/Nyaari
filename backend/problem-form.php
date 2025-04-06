<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Database connection
    $servername = "localhost";
    $username = "your_username";
    $password = "your_password";
    $dbname = "nyaari_db";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Get form data
        $age = $_POST['age'];
        $problem = $_POST['problem'];
        $symptoms = $_POST['symptoms'];
        $duration = $_POST['duration'];
        $email = $_POST['email']; // Optional
        $timestamp = date('Y-m-d H:i:s');

        // Insert into database
        $stmt = $conn->prepare("INSERT INTO problems (age, problem, symptoms, duration, email, timestamp) 
                              VALUES (:age, :problem, :symptoms, :duration, :email, :timestamp)");
        
        $stmt->bindParam(':age', $age);
        $stmt->bindParam(':problem', $problem);
        $stmt->bindParam(':symptoms', $symptoms);
        $stmt->bindParam(':duration', $duration);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':timestamp', $timestamp);
        
        $stmt->execute();
        
        echo "<script>alert('Your problem has been submitted successfully. A doctor will review it shortly.');</script>";
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submit Your Problem - Nyaari</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: #f8f9fa;
            color: #2c3e50;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        h1 {
            color: #6c5ce7;
            text-align: center;
            margin-bottom: 30px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }
        input[type="number"],
        input[type="email"],
        textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        textarea {
            height: 150px;
            resize: vertical;
        }
        .submit-btn {
            background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
            color: white;
            padding: 12px 25px;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            width: 100%;
            transition: transform 0.3s ease;
        }
        .submit-btn:hover {
            transform: translateY(-3px);
        }
        .privacy-note {
            font-size: 14px;
            color: #666;
            margin-top: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Submit Your Health Concern</h1>
        <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
            <div class="form-group">
                <label for="age">Age</label>
                <input type="number" id="age" name="age" required min="13" max="100">
            </div>
            
            <div class="form-group">
                <label for="problem">Describe your problem</label>
                <textarea id="problem" name="problem" required placeholder="Please describe your health concern in detail..."></textarea>
            </div>
            
            <div class="form-group">
                <label for="symptoms">Symptoms (if any)</label>
                <textarea id="symptoms" name="symptoms" placeholder="List any symptoms you're experiencing..."></textarea>
            </div>
            
            <div class="form-group">
                <label for="duration">Duration of the problem</label>
                <input type="text" id="duration" name="duration" placeholder="e.g., 2 weeks, 1 month">
            </div>
            
            <div class="form-group">
                <label for="email">Email (optional)</label>
                <input type="email" id="email" name="email" placeholder="If you want to receive updates">
            </div>
            
            <button type="submit" class="submit-btn">Submit Problem</button>
        </form>
        <p class="privacy-note">
            Your privacy is our priority. All information shared is strictly confidential and will only be viewed by our medical professionals.
        </p>
    </div>
</body>
</html> 