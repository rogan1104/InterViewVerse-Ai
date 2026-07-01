import whisper


class VoiceAnalyzer:

    def __init__(self):

        print("Loading Whisper model...")

        # Use tiny model for faster inference
        self.model = whisper.load_model("small")

    def analyze(self, audio_file):

        result = self.model.transcribe(
            audio_file,
            language="en",
            fp16=False
        )

        transcript = result["text"].strip()

        print("\nRaw Whisper Output:")
        print(result)

        words = transcript.split()
        word_count = len(words)

        if len(result["segments"]) > 0:
            duration = result["segments"][-1]["end"]
        else:
            duration = 1

        wpm = (word_count * 60) / duration

        fillers = [
            "um",
            "uh",
            "like",
            "actually",
            "basically",
            "you know"
        ]

        filler_count = sum(
            1 for word in words
            if word.lower().strip(".,!?") in fillers
        )

        return {

            "transcript": transcript,

            "words": word_count,

            "duration": round(duration, 1),

            "wpm": round(wpm, 1),

            "fillers": filler_count

        }