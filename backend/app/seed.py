from database import engine, SessionLocal, Base
from models import Player

INITIAL_PLAYERS = [
    {
        "name": "Virat Kohli",
        "role": "Top-order Batsman",
        "jersey_number": 18,
        "batting_style": "Right-hand bat",
        "bowling_style": "Right-arm medium",
        "avatar_url": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&auto=format&fit=crop&q=80",
        "bio": "Former captain of the Indian national team, regarded as one of the greatest batsmen in international cricket history.",
        "recognition_count": 42,
        "avg_confidence": 98.4
    },
    {
        "name": "Rohit Sharma",
        "role": "Opening Batsman (Captain)",
        "jersey_number": 45,
        "batting_style": "Right-hand bat",
        "bowling_style": "Right-arm offbreak",
        "avatar_url": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&auto=format&fit=crop&q=80",
        "bio": "Current captain of the Indian national team in T20Is and ODIs, famous for his double centuries in ODI cricket.",
        "recognition_count": 38,
        "avg_confidence": 97.1
    },
    {
        "name": "Jasprit Bumrah",
        "role": "Fast Bowler",
        "jersey_number": 93,
        "batting_style": "Right-hand bat",
        "bowling_style": "Right-arm fast",
        "avatar_url": "https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=400&auto=format&fit=crop&q=80",
        "bio": "Premier fast bowler known for his unique slingy action, lethal yorkers, and exceptional economy rate in death overs.",
        "recognition_count": 31,
        "avg_confidence": 96.8
    },
    {
        "name": "Hardik Pandya",
        "role": "All-rounder",
        "jersey_number": 33,
        "batting_style": "Right-hand bat",
        "bowling_style": "Right-arm fast-medium",
        "avatar_url": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
        "bio": "Dynamic power-hitting all-rounder and vice-captain known for match-winning performances with both bat and ball.",
        "recognition_count": 29,
        "avg_confidence": 95.5
    },
    {
        "name": "KL Rahul",
        "role": "Wicketkeeper Batsman",
        "jersey_number": 1,
        "batting_style": "Right-hand bat",
        "bowling_style": "N/A",
        "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
        "bio": "Versatile top-order batter and reliable wicketkeeper, capable of anchoring innings across all formats.",
        "recognition_count": 24,
        "avg_confidence": 94.2
    },
    {
        "name": "Shubman Gill",
        "role": "Opening Batsman",
        "jersey_number": 77,
        "batting_style": "Right-hand bat",
        "bowling_style": "Right-arm offbreak",
        "avatar_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
        "bio": "Stylish young opening prodigy, holding records for being the youngest player to score a double century in ODIs.",
        "recognition_count": 27,
        "avg_confidence": 96.0
    },
    {
        "name": "Ravindra Jadeja",
        "role": "All-rounder",
        "jersey_number": 8,
        "batting_style": "Left-hand bat",
        "bowling_style": "Slow left-arm orthodox",
        "avatar_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
        "bio": "World-class spin all-rounder and elite fielder known for rapid overs, razor-sharp throws, and crucial lower-order runs.",
        "recognition_count": 26,
        "avg_confidence": 95.9
    },
    {
        "name": "Mohammed Shami",
        "role": "Fast Bowler",
        "jersey_number": 11,
        "batting_style": "Right-hand bat",
        "bowling_style": "Right-arm fast-medium",
        "avatar_url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
        "bio": "Seam bowler famed for his upright seam position, devastating swing, and top wicket-taking performances in ICC World Cups.",
        "recognition_count": 22,
        "avg_confidence": 94.8
    }
]

def seed_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    existing_count = db.query(Player).count()
    if existing_count == 0:
        print("Seeding Indian Cricketers database...")
        for player_data in INITIAL_PLAYERS:
            player = Player(**player_data)
            db.add(player)
        db.commit()
        print("Seeding complete! 8 players added.")
    else:
        print(f"Database already seeded with {existing_count} players.")
        
    db.close()

if __name__ == "__main__":
    seed_db()
