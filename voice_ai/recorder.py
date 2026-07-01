import sounddevice as sd
from scipy.io.wavfile import write


class Recorder:

    def record(self, duration=30):

        fs = 16000

        audio = sd.rec(
            int(duration * fs),
            samplerate=fs,
            channels=1,
            dtype="int16"
        )

        sd.wait()

        write("interview.wav", fs, audio)

        return "interview.wav"