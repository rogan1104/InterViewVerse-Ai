import cv2

LEFT_EYE_LEFT = 33
LEFT_EYE_RIGHT = 133

RIGHT_EYE_LEFT = 362
RIGHT_EYE_RIGHT = 263

LEFT_IRIS = [468, 469, 470, 471, 472]
RIGHT_IRIS = [473, 474, 475, 476, 477]


class GazeEstimator:

    def get_center(self, landmarks, indices):

        x = 0
        y = 0

        for idx in indices:
            x += landmarks[idx].x
            y += landmarks[idx].y

        return x / len(indices), y / len(indices)

    def eye_ratio(self, iris_x, left_corner, right_corner):

        eye_width = right_corner.x - left_corner.x

        if abs(eye_width) < 1e-6:
            return 0.5

        return (iris_x - left_corner.x) / eye_width

    def estimate(self, frame, face):

        h, w, _ = frame.shape

        landmarks = face.landmark

        # Left iris
        left_x, left_y = self.get_center(landmarks, LEFT_IRIS)

        # Right iris
        right_x, right_y = self.get_center(landmarks, RIGHT_IRIS)

        # Ratios
        left_ratio = self.eye_ratio(
            left_x,
            landmarks[LEFT_EYE_LEFT],
            landmarks[LEFT_EYE_RIGHT]
        )

        right_ratio = self.eye_ratio(
            right_x,
            landmarks[RIGHT_EYE_LEFT],
            landmarks[RIGHT_EYE_RIGHT]
        )

        ratio = (left_ratio + right_ratio) / 2

        if ratio < 0.42:
            gaze = "LEFT"
        elif ratio > 0.58:
            gaze = "RIGHT"
        else:
            gaze = "CENTER"

                # Draw iris centers
        cv2.circle(frame, (int(left_x*w), int(left_y*h)), 6, (0,0,255), -1)
        cv2.circle(frame, (int(right_x*w), int(right_y*h)), 6, (0,0,255), -1)

        

        # Display gaze
        def draw_dashboard(frame, data, blink_count, gaze):

            cv2.rectangle(frame, (10, 10), (340, 220), (40, 40, 40), -1)

            cv2.putText(frame, "InterviewVerse AI",
                        (20, 35),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.8,
                        (255,255,255),
                        2)

            cv2.putText(frame,
                        f"Gaze : {gaze}",
                        (20,70),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.6,
                        (255,200,0),
                        2)

            cv2.putText(frame,
                        f"Eye Contact : {data['eye_contact']}%",
                        (20,100),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.6,
                        (0,255,0),
                        2)

            cv2.putText(frame,
                        f"Looking Away : {data['looking_away']}%",
                        (20,130),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.6,
                        (0,255,255),
                        2)

            cv2.putText(frame,
                        f"Blinks : {blink_count}",
                        (20,160),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.6,
                        (255,255,0),
                        2)

            cv2.putText(frame,
                        f"Time : {data['duration']} sec",
                        (20,190),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.6,
                        (255,255,255),
                        2)
                
        return gaze