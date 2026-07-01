import math

# Left eye landmarks
LEFT = [33, 160, 158, 133, 153, 144]

# Right eye landmarks
RIGHT = [362, 385, 387, 263, 373, 380]


class BlinkDetector:

    def __init__(self):
        self.blinks = 0
        self.closed_frames = 0

    def distance(self, p1, p2):

        return math.sqrt(
            (p1.x - p2.x) ** 2 +
            (p1.y - p2.y) ** 2
        )

    def ear(self, landmarks, eye):

        p1 = landmarks[eye[0]]
        p2 = landmarks[eye[1]]
        p3 = landmarks[eye[2]]
        p4 = landmarks[eye[3]]
        p5 = landmarks[eye[4]]
        p6 = landmarks[eye[5]]

        vertical = (
            self.distance(p2, p6) +
            self.distance(p3, p5)
        ) / 2

        horizontal = self.distance(p1, p4)

        return vertical / horizontal

    def detect(self, face):

        landmarks = face.landmark

        left_ear = self.ear(landmarks, LEFT)
        right_ear = self.ear(landmarks, RIGHT)

        avg_ear = (left_ear + right_ear) / 2

        if avg_ear < 0.20:
            self.closed_frames += 1

        else:

            if self.closed_frames >= 2:
                self.blinks += 1

            self.closed_frames = 0

        return self.blinks