package com.example.backend;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Path("/anime")
@Produces("application/json")
@Consumes("application/json")
public class AnimeResource {

    @GET
    @Path("/list")
    public String getAnimeList() {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Get all anime from Firestore
            var snapshot = db.collection("anime").get().get();

            if (snapshot.getDocuments().isEmpty()) {
                return "{\"message\": \"No anime found\"}";
            }

            return "{\"count\": " + snapshot.getDocuments().size() + ", \"status\": \"success\"}";
        } catch (ExecutionException | InterruptedException e) {
            return "{\"error\": \"" + e.getMessage() + "\"}";
        }
    }

    @POST
    @Path("/add")
    public String addAnime(String animeJson) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Parse the incoming JSON (you can use a JSON library like Gson)
            // For now, we'll create a simple example

            Map<String, Object> data = new HashMap<>();
            data.put("id", System.currentTimeMillis() + "");
            data.put("name", "Sample Anime");
            data.put("pictures", List.of(
                    "https://firebasestorage.googleapis.com/v0/b/.../o/pic1.jpg",
                    "https://firebasestorage.googleapis.com/v0/b/.../o/pic2.jpg",
                    "https://firebasestorage.googleapis.com/v0/b/.../o/pic3.jpg",
                    "https://firebasestorage.googleapis.com/v0/b/.../o/pic4.jpg",
                    "https://firebasestorage.googleapis.com/v0/b/.../o/pic5.jpg"
            ));

            String documentId = (String) data.get("id");
            db.collection("anime").document(documentId).set(data).get();

            return "{\"message\": \"Anime added successfully\", \"id\": \"" + documentId + "\"}";
        } catch (ExecutionException | InterruptedException e) {
            return "{\"error\": \"" + e.getMessage() + "\"}";
        }
    }

    @GET
    @Path("/{id}")
    public String getAnimeById(String id) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            var document = db.collection("anime").document(id).get().get();

            if (!document.exists()) {
                return "{\"error\": \"Anime not found\"}";
            }

            Map<String, Object> data = document.getData();
            return "{\"id\": \"" + data.get("id") + "\", \"name\": \"" + data.get("name") + "\"}";
        } catch (ExecutionException | InterruptedException e) {
            return "{\"error\": \"" + e.getMessage() + "\"}";
        }
    }
}
