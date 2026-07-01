import cv2
import numpy as np


class HeadPoseEstimator:

    def estimate(self, frame, face_landmarks):

        h, w, _ = frame.shape

        # 2D image points
        face_2d = []

        # 3D object points
        face_3d = []

        # Key landmarks
        indices = [33, 263, 1, 61, 291, 199]

        for idx in indices:

            lm = face_landmarks.landmark[idx]

            x = lm.x * w
            y = lm.y * h

            face_2d.append([x, y])
            face_3d.append([x, y, lm.z * 3000])

        face_2d = np.array(face_2d, dtype=np.float64)
        face_3d = np.array(face_3d, dtype=np.float64)

        focal_length = w

        cam_matrix = np.array([
            [focal_length, 0, w / 2],
            [0, focal_length, h / 2],
            [0, 0, 1]
        ])

        dist_matrix = np.zeros((4, 1), dtype=np.float64)

        success, rot_vec, trans_vec = cv2.solvePnP(
            face_3d,
            face_2d,
            cam_matrix,
            dist_matrix
        )

        if not success:
            return "UNKNOWN"

        rmat, _ = cv2.Rodrigues(rot_vec)

        angles, _, _, _, _, _ = cv2.RQDecomp3x3(rmat)

        pitch = angles[0] * 360
        yaw = angles[1] * 360

        if yaw < -10:
            direction = "HEAD LEFT"

        elif yaw > 10:
            direction = "HEAD RIGHT"

        elif pitch < -10:
            direction = "HEAD DOWN"

        elif pitch > 10:
            direction = "HEAD UP"

        else:
            direction = "HEAD CENTER"

        cv2.putText(
            frame,
            direction,
            (20, 210),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (255, 0, 255),
            2
        )

        return direction