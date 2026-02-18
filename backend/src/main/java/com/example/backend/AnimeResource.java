package com.example.backend;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.firebase.cloud.FirestoreClient;
import java.util.HashMap;
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

            // Example: Get all anime from Firestore
            // Replace "anime" with your actual collection name
            var snapshot = db.collection("anime").get().get();

            if (snapshot.getDocuments().isEmpty()) {
                return "{\"message\": \"No anime found\"}";
            }

            return "{\"count\": " + snapshot.getDocuments().size() + ", \"status\": \"success\"}";
        } catch (ExecutionException | InterruptedException e) {
            return "{\"error\": \"" + e.getMessage() + "\"}";
        }
    }
}

