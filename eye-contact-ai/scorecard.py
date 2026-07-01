class ScoreCard:

    def rating(self, value):

        if value >= 90:
            return "★★★★★"

        elif value >= 75:
            return "★★★★☆"

        elif value >= 60:
            return "★★★☆☆"

        elif value >= 40:
            return "★★☆☆☆"

        else:
            return "★☆☆☆☆"


    def generate(self, report):

        eye = self.rating(report["eye_contact"])

        engagement = self.rating(report["engagement"])

        distraction = self.rating(
            100 - report["looking_away"]
        )

        # Blink quality
        blink = report["blink_count"]

        if blink <= 15:
            blink_rating = "★★★☆☆"

        elif blink <= 35:
            blink_rating = "★★★★★"

        elif blink <= 50:
            blink_rating = "★★★☆☆"

        else:
            blink_rating = "★★☆☆☆"

        return {

            "Eye Contact": eye,

            "Attention Stability": engagement,

            "Distraction Control": distraction,

            "Blink Behaviour": blink_rating

        }