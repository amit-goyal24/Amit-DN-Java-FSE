package com.cognizant.ormlearn.service;
import com.cognizant.ormlearn.model.Skill;
import com.cognizant.ormlearn.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@Service
public class SkillService {
    @Autowired private SkillRepository skillRepository;
    @Transactional public Skill get(int id) { return skillRepository.findById(id).get(); }
    @Transactional public void save(Skill skill) { skillRepository.save(skill); }
}