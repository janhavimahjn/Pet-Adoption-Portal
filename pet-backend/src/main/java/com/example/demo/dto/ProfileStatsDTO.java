package com.example.demo.dto;

public class ProfileStatsDTO {

    private int favoriteCount;

    private int requestCount;

    private long adoptedCount;

    public int getFavoriteCount() {
        return favoriteCount;
    }

    public void setFavoriteCount(
            int favoriteCount
    ) {
        this.favoriteCount = favoriteCount;
    }

    public int getRequestCount() {
        return requestCount;
    }

    public void setRequestCount(
            int requestCount
    ) {
        this.requestCount = requestCount;
    }

    public long getAdoptedCount() {
        return adoptedCount;
    }

    public void setAdoptedCount(
            long adoptedCount
    ) {
        this.adoptedCount = adoptedCount;
    }
}