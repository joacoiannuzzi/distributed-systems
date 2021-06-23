use std::collections::HashMap;

mod service;
use service::auth_service_server::{AuthService, AuthServiceServer};
use service::{AuthResult, AuthenticateReq, AuthenticateRes};
use tonic::{transport::Server, Request, Response, Status};

pub struct MyAuthService {
    users: HashMap<String, String>,
}

impl Default for MyAuthService {
    fn default() -> Self {
        let mut users = HashMap::new();
        users.insert("name@gmail.com".to_string(), "mypassword".to_string());
        users.insert(
            "another@gmail.com".to_string(),
            "anotherpassword".to_string(),
        );

        Self { users }
    }
}

#[tonic::async_trait]
impl AuthService for MyAuthService {
    async fn authenticate(
        &self,
        request: Request<AuthenticateReq>,
    ) -> Result<Response<AuthenticateRes>, Status> {
        let AuthenticateReq { mail, password } = request.get_ref();
        let is_authenticated = self.users.get(mail).map_or(false, |s| s == password);
        let result = if is_authenticated {
            AuthResult::Ok as i32
        } else {
            AuthResult::Failed as i32
        };

        Ok(Response::new(AuthenticateRes { result }))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // defining address for our service
    let port = "50051";
    let addr = format!("0.0.0.0:{}", port).parse().unwrap();

    // creating a service
    let auth_service = MyAuthService::default();
    println!("Server listening on port {}", port);

    // adding our service to our server.
    Server::builder()
        .add_service(AuthServiceServer::new(auth_service))
        .serve(addr)
        .await?;
    Ok(())
}
