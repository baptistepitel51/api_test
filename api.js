
/*---------------------------- Fonction accessUser() ----------------------------------------------*/

// Méthode qui permet de récupérer l'accès d'un utilisateur en fonction d'une entreprise
function accessUser()
{
    // on récupère les valeurs du formulaire
    let userId = document.getElementById('userId_1').value;
    let firmId =  document.getElementById('firmId_1').value;
    // Création du lien de l'API
    let url = 'http://localhost:8080/api/v1/user';

    // Affichage des valeurs dans la console
    console.log(userId);
    console.log(firmId);
    console.log(url); 
    
    // on recupère les paragraphe de l'html pour y intégrer les valeurs 
    var status = document.getElementById("p1");
    var result = document.getElementById("p2");

    /*
        Appel de la méthode ajaxPost qui s'occupe de la requête post
            url :  url de l'api
            userId : id de l'utilisateur
            firmId : id de l'entreprise
            methode callback avec response en paramètre
    */
     ajaxPost(url, userId , firmId, (response) => 
    {
        // On transforme la réponse de la méthode ajaxPost en JSON.
        response  = JSON.parse(response);   
        
        if(response.status == "error")
        {
            status.innerHTML = "Status : " + response.status + "<br>";
            result.innerHTML = "Resultat : " + response.message;
        }
        else
        {
            status.innerHTML = "Status : " + response.status + "<br>";
            result.innerHTML = "Resultat : " + response.result;
        }

        // On ecrit les valeurs dans les paragraphes récupérer auparavant
       
    });    
    // On retourne false pour éviter le rechargement de la page ce qui permet de garder l'affichage
    return false;
}





// Méthode qui s'occupe de la requête post  pour allez chercher l'accès de l'utilisateur
/**
 * 
 * @param {string} url Url de la requête 
 * @param {string} userId Id de l'utilisateur sous forme de chaine de caractère
 * @param {string} firmId Id de l'entreprise sous forme de chaine de caractère
 * @param {function} callback Méthode callback 
 */
function ajaxPost(url, userId, firmId, callback) 
{
    // on crée l'objet XMLHttpRequest qui permet de l'interaction avec le serveur
    var req = new XMLHttpRequest();   
    // On initialise la requête en méthode POST, avec l'url mis en paramètre.
    req.open("POST", url,true);      
    // On fixe la valeur du HTTP Request Header
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    /* 
        On envoit la requête avec les paramètres 
            userId : Id de l'utilisateur
            firmId : Id de l'entreprise
    */
    req.send("userId=" + userId + "&firmId= "+firmId);
    
    // On execute la fonction quand la requête est complète
    req.onload = function()
    {
        // On verifie si le status de la requête est correcte
        if (req.status == 200) 
        {   
            //Appelle de la méthode callback mis en paramètre
            callback(req.responseText); 
        } 
        else
        {
            // Message d'erreur en fonction du status de la requête
            console.error(req.status + " " + req.statusText + " " + url);
        }
    };
    // On executte cette fonction si cela renvoir une error avec le serveur
    req.error = function()
    {
        // Message d'erreur
        console.error("Erreur réseau avec l'URL " + url);
    };   
}





/*------------------------ Fonction allFirm() ----------------------------------------------*/

// Méthode qui permet de récupérer la liste d'entreprise d'un utilisateur 
function allFirm()
{
    // on récupère les valeurs du formulaire
    let userId = document.getElementById('userId_2').value;
    // Création du lien de l'API
    let url = 'http://localhost:8080/api/v1/user/firm';

    // Affichage des valeurs dans la console
    console.log(userId);
    console.log(url);

    // on recupère les paragraphe de l'html pour y intégrer les valeurs
    var status = document.getElementById("p3");
    var paragraphe = document.getElementById("p4");
  
    /*
        Appel de la méthode ajaxPost qui s'occupe de la requête post
            url :  url de l'api
            userId : id de l'utilisateur
            firmId : id de l'entreprise
            methode callback avec response en paramètre
    */
    ajaxPost2(url, userId,(response) =>
     {
        // On transforme la réponse de la méthode ajaxPost en JSON.
        response  = JSON.parse(response);

        if(response.status == "error")
        {
            status.innerHTML = "Status : " + response.status + "<br>";
            paragraphe.innerHTML = "Resultat : " + response.message;
        }
        else
        {
            // On ecrit la valeur du status dans son paragraphe
            status.innerHTML = "Status : " + response.status + "<br>";  
            // On vide le paragraphe de la liste de l'entreprise
            paragraphe.innerHTML ="";
            // On effectue un forEach sur l'element JSON result pour récupérer la liste de l'entreprise
            response.result.forEach(function(element)
            {
                // On ecrit les valeur des entreprises dans son paragraphe
                paragraphe.innerHTML += "User : " + element.MSUSER + "  ---  Firm 1 : " + element.MSMCUF +  "  ----   Firm 2 : " + element.MSMCUT + "<br>";       
            }); 
        }   
    });
      // On retourne false pour éviter le rechargement de la page ce qui permet de garder l'affichage
    return false;
}





// Méthode qui s'occupe de la requête post pour recupérer la liste d'entreprise de l'utilisateur
/**
 * 
 * @param {string} url Url de la requête 
 * @param {string} userId Id de l'utilisateur sous forme de chaine de caractère
 * @param {function} callback Méthode callback 
 */
function ajaxPost2(url, userId, callback) 
{
    // on crée l'objet XMLHttpRequest qui permet de l'interaction avec le serveur
    var req = new XMLHttpRequest();  
    // On initialise la requête en méthode POST, avec l'url mis en paramètre.
    req.open("POST", url,true); 
    // On fixe la valeur du HTTP Request Header
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    /* 
        On envoit la requête avec les paramètres 
            userId : Id de l'utilisateur
    */
    req.send("userId=" + userId);
    // On execute la fonction quand la requête est complète
    req.onload = function()
    {
        // On verifie si le status de la requête est correcte
        if (req.status == 200) 
        {      
            //Appelle de la méthode callback mis en paramètre
            callback(req.responseText);
        } 
        else
        {
            // Message d'erreur en fonction du status de la requête
            console.error(req.status + " " + req.statusText + " " + url);
        }
    };
    // On executte cette fonction si cela renvoir une error avec le serveur
    req.error = function()
    {
        // Message d'erreur
        console.error("Erreur réseau avec l'URL " + url);
    };        
}

