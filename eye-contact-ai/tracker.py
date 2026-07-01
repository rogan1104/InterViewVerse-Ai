import cv2
import mediapipe as mp

class FaceTracker:

    def __init__(self):
        self.mp_face_mesh = mp.solutions.face_mesh

        self.face_mesh = self.mp_face_mesh.FaceMesh(
            static_image_mode=False,
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )

        self.mp_drawing = mp.solutions.drawing_utils

        self.drawing_spec = self.mp_drawing.DrawingSpec(
            color=(0,255,0),
            thickness=1,
            circle_radius=1
        )

    def process(self, frame):

        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        results = self.face_mesh.process(rgb)

        return results

    def draw_mesh(self, frame, face_landmarks):
        pass
    # self.mp_drawing.draw_landmarks(
    #     image=frame,
    #     landmark_list=face_landmarks,
    #     connections=self.mp_face_mesh.FACEMESH_TESSELATION,
    #     landmark_drawing_spec=None,
    #     connection_drawing_spec=self.drawing_spec
    # )