package com.netflixclone.contentservice.controller;

import com.netflixclone.contentservice.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/content")
public class ContentController {

    @Autowired
    private ContentService contentService;

    @GetMapping("/trending")
    public String FetchTrending() throws IOException {
        return contentService.FetchTrending();
    }

    @GetMapping("/originals")
    public String FetchOriginals() throws IOException {
        return contentService.FetchOriginals();
    }

    @GetMapping("/top_rated")
    public String FetchTopRated() throws IOException {
        return contentService.FetchTopRated();
    }

    @GetMapping("/action")
    public String FetchActionMovies() throws IOException {
        return contentService.FetchActionMovies();
    }

    @GetMapping("/comedy")
    public String FetchComedyMovies() throws IOException {
        return contentService.FetchComedyMovies();
    }

    @GetMapping("/horror")
    public String FetchHorrorMovies() throws IOException {
        return contentService.FetchHorrorMovies();
    }

    @GetMapping("/romance")
    public String FetchRomanceMovies() throws IOException {
        return contentService.FetchRomanceMovies();
    }

    @GetMapping("/documentary")
    public String FetchDocumentaryMovies() throws IOException {
        return contentService.FetchDocumentaryMovies();
    }

}
