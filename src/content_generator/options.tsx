import { Linkedin, Github, Facebook, Instagram, Twitter, PictureInPicture } from "lucide-react";

export const platformOptions: { id: string; label: string; icon?: React.ReactElement<{}> }[] = [
    { id: "linkedin", label: "LinkedIn", icon: <Linkedin />},
    { id: "github", label: "GitHub", icon: <Github />},
    { id: "facebook", label: "Facebook", icon: <Facebook />}, 
    { id: "instagram", label: "Instagram", icon: <Instagram />},
    { id: "twitter", label: "Twitter", icon: <Twitter />},
    { id: "pinterest", label: "Pinterest", icon: <PictureInPicture />}
]

export const audienceOptions: { id: string; label: string }[] = [
    { id: "adults", label: "Adults" },
    { id: "adolescents", label: "Adolescents" },
    { id: "students", label: "Students" },
    { id: "seniors", label: "Seniors" },
    { id: "children", label: "Children" },
    { id: "families", label: "Families" },
    { id: "LGBTQ+", label: "LGBTQ+" },
    { id: "women", label: "Women" },
    { id: "men", label: "Men" },
    { id: "people_of_color", label: "People of Color" },
    { id: "people_with_disabilities", label: "People with Disabilities" },
    { id: "veterans", label: "Veterans" },
    { id: "professionals", label: "Professionals" },
    { id: "homemakers", label: "Homemakers" },
    { id: "religious_groups", label: "Religious Groups" },
    { id: "ethnic_groups", label: "Ethnic Groups" },
    { id: "gamers", label: "Gamers" },
    { id: "sports_fans", label: "Sports Fans" },
    { id: "music_lovers", label: "Music Lovers" },
    { id: "book_readers", label: "Book Readers" },
    { id: "foodies", label: "Foodies" },
    { id: "travelers", label: "Travelers" },
    { id: "tech_enthusiasts", label: "Tech Enthusiasts" }
];

export const toneOptions = [
    { id: "casual", label: "Casual" },
    { id: "professional", label: "Professional" },
    { id: "humorous", label: "Humorous" },
    { id: "inspirational", label: "Inspirational" },
    { id: "persuasive", label: "Persuasive" },
    { id: "urgent", label: "Urgent" },
    { id: "sarcastic", label: "Sarcastic" },
    { id: "nostalgic", label: "Nostalgic" },
    { id: "mysterious", label: "Mysterious" },
    { id: "optimistic", label: "Optimistic" },
    { id: "dramatic", label: "Dramatic" },
    { id: "whimsical", label: "Whimsical" },
    { id: "cynical", label: "Cynical" },
];