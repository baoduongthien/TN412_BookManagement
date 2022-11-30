package com.nhom8.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.nhom8.models.Publisher;
import com.nhom8.repository.PublisherRepository;

@Service
public class PublisherService {
    @Autowired
    PublisherRepository publisherRepository;

    public Page<Publisher> getAllPublishers(Optional<Integer> page, Optional<String> sortBy) {
        Page<Publisher> pagePublisher = publisherRepository.findAll(PageRequest.of(page.orElse(0), 5, Sort.Direction.DESC, sortBy.orElse("id")));
        return pagePublisher;
    }

    public Publisher createPublisher(Publisher publisher) {
        return publisherRepository.save(publisher);
    }

    public Publisher getPublisher(Long id) {
        return publisherRepository.findById(id).get();
    }

    public Publisher editPublisher(Long id, Publisher editedPublisher) {
        Publisher publisher = publisherRepository.findById(id).get();
        publisher.setName(editedPublisher.getName());
        publisherRepository.save(publisher);

        return publisher;
    }

    public Publisher deletePublisher(Long id) {
        Publisher publisher = publisherRepository.findById(id).get();            
        publisherRepository.delete(publisher);

        return publisher;
    }
}
