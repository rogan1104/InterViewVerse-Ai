import cv2

from tracker import FaceTracker
from gaze import GazeEstimator
from blink import BlinkDetector
from metrics import Metrics
from report import ReportGenerator
from summary import SummaryGenerator
from timeline import Timeline
from scorecard import ScoreCard

# from headpose import HeadPoseEstimator


tracker = FaceTracker()
gaze = GazeEstimator()
blink = BlinkDetector()
metrics = Metrics()
report = ReportGenerator()
summary = SummaryGenerator()
scorecard = ScoreCard()
timeline = Timeline()
# headpose = HeadPoseEstimator()

cap = cv2.VideoCapture(0)

blink_count = 0
gaze_direction = "CENTER"


while True:

    success, frame = cap.read()

    if not success:
        break

    frame = cv2.flip(frame, 1)

    results = tracker.process(frame)

    if results.multi_face_landmarks:

        for face_landmarks in results.multi_face_landmarks:

            # -------------------------------------------------
            # Face Mesh (Disabled for Production UI)
            # Uncomment for debugging
            # tracker.draw_mesh(frame, face_landmarks)
            # -------------------------------------------------

            gaze_direction = gaze.estimate(
                frame,
                face_landmarks
            )

            metrics.update(gaze_direction)
            timeline.update(gaze_direction)
            timeline.update(gaze_direction)

            blink_count = blink.detect(
                face_landmarks
            )

            # -------------------------------------------------
            # Head Pose (Disabled - we'll improve it later)
            # head_direction = headpose.estimate(
            #     frame,
            #     face_landmarks
            # )
            # -------------------------------------------------

    data = metrics.get_metrics()

    # ===========================
    # Dashboard
    # ===========================

    cv2.rectangle(
        frame,
        (10, 10),
        (350, 240),
        (40, 40, 40),
        -1
    )

    cv2.putText(
        frame,
        "InterviewVerse AI",
        (20, 35),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.8,
        (255, 255, 255),
        2
    )

    cv2.putText(
        frame,
        f"Gaze : {gaze_direction}",
        (20, 70),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.6,
        (255, 200, 0),
        2
    )

    cv2.putText(
        frame,
        f"Eye Contact : {data['eye_contact']}%",
        (20, 100),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.6,
        (0, 255, 0),
        2
    )

    cv2.putText(
        frame,
        f"Looking Away : {data['looking_away']}%",
        (20, 130),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.6,
        (0, 255, 255),
        2
    )

    cv2.putText(
        frame,
        f"Blinks : {data['blink_count']}",
        (20,170),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.6,
        (0,255,255),
        2
    )

    cv2.putText(
        frame,
        f"Blink Rate : {data['blink_rate']:.1f}/min",
        (20,200),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.6,
        (0,255,255),
        2
    )
    cv2.putText(
        frame,
        f"Engagement : {data['engagement']}%",
        (20, 190),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.6,
        (0, 255, 0),
        2
    )

    cv2.putText(
        frame,
        f"Time : {data['duration']} sec",
        (20, 220),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.6,
        (255, 255, 255),
        2
    )

    cv2.imshow(
        "InterviewVerse AI",
        frame
    )

    key = cv2.waitKey(1)

    if key == ord('q') or key == 27:
        break


report_data = {

    "candidate": {
        "name": "Unknown",
        "duration": data["duration"]
    },

    "metrics": {

        "eye_contact": data["eye_contact"],

        "looking_away": data["looking_away"],

        "blink_count": data["blink_count"],


        "blink_rate": data["blink_rate"],


        "engagement": data["engagement"],

        "longest_distraction": timeline.get_longest_distraction()

    },

    "timeline": timeline.get_events()

}

report_data["scorecard"] = scorecard.generate(
    report_data["metrics"]
)

report_data["summary"] = summary.generate(
    report_data["metrics"]
)

report.save(report_data)
cap.release()
cv2.destroyAllWindows()