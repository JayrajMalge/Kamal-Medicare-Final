
package web.hospital.backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class pageController {
//    @RequestMapping(value = "/get")
//    public String redirect() {
//        return "forward:/index.html";
//    }

    @GetMapping("/")
    public String redirect()
    {
        return "index";
    }
}
