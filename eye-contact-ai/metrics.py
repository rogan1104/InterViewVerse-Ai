import time


class Metrics:

    def __init__(self):

        self.start_time = time.time()

        self.total_frames = 0
        self.eye_contact_frames = 0
        self.looking_away_frames = 0

        self.blink_count = 0

    def update(self, gaze, blink_count):

        self.blink_count = blink_count

        self.total_frames += 1

        if gaze == "CENTER":
            self.eye_contact_frames += 1
        else:
            self.looking_away_frames += 1

    def get_metrics(self):

        if self.total_frames == 0:
            eye_contact = 0
            looking_away = 0
        else:
            eye_contact = (
                self.eye_contact_frames /
                self.total_frames
            ) * 100

            looking_away = (
                self.looking_away_frames /
                self.total_frames
            ) * 100

        # Interview duration (seconds)
        elapsed = time.time() - self.start_time

        # Blink rate (blinks per minute)
        if elapsed > 0:
            blink_rate = (self.blink_count * 60) / elapsed
        else:
            blink_rate = 0

        # Blink quality score
        if 10 <= blink_rate <= 25:
            blink_score = 100
        elif blink_rate < 10:
            blink_score = 80
        else:
            blink_score = max(50, 100 - (blink_rate - 25) * 2)

        # Overall engagement score
        engagement = (
            eye_contact * 0.7 +
            (100 - looking_away) * 0.2 +
            blink_score * 0.1
        )

        engagement = max(0, min(100, engagement))

        return {

            "eye_contact": round(eye_contact, 1),

            "looking_away": round(looking_away, 1),

            "duration": int(elapsed),

            "engagement": round(engagement, 1),

            "blink_count": self.blink_count,

            "blink_rate": round(blink_rate, 1)

        }