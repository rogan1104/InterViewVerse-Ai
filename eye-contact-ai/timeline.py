import time


class Timeline:

    def __init__(self):

        self.start_time = time.time()

        self.events = []

        self.previous_gaze = "CENTER"

        self.away_start = None
        self.center_start = time.time()

        self.longest_away = 0

    def current_time(self):

        elapsed = int(time.time() - self.start_time)

        minutes = elapsed // 60
        seconds = elapsed % 60

        return f"{minutes:02}:{seconds:02}"

    def update(self, gaze):

        now = time.time()

        # -------------------------
        # Lost eye contact
        # -------------------------
        if self.previous_gaze == "CENTER" and gaze != "CENTER":

            center_duration = now - self.center_start

            # Record only meaningful eye contact
            if center_duration >= 30:
                self.events.append(
                    f"{self.current_time()}  Maintained eye contact for {center_duration:.1f} sec"
                )

            self.away_start = now

        # -------------------------
        # Eye contact regained
        # -------------------------
        elif self.previous_gaze != "CENTER" and gaze == "CENTER":

            if self.away_start is not None:

                away_duration = now - self.away_start

                if away_duration > self.longest_away:
                    self.longest_away = away_duration

                # Ignore tiny distractions
                if away_duration >= 2:

                    self.events.append(
                        f"{self.current_time()}  Looked away for {away_duration:.1f} sec"
                    )

                self.center_start = now
                self.away_start = None

        self.previous_gaze = gaze

    def get_events(self):

        return self.events

    def get_longest_distraction(self):

        return round(self.longest_away, 1)