import os

# Add local FFmpeg to PATH
ffmpeg_bin = os.path.join(os.getcwd(), "ffmpeg", "bin")
os.environ["PATH"] = ffmpeg_bin + os.pathsep + os.environ["PATH"]

from recorder import Recorder
from analyzer import VoiceAnalyzer

print("Initializing...")

recorder = Recorder()
analyzer = VoiceAnalyzer()

print("Recording for 20 seconds...")
audio = recorder.record(20)

print("Analyzing speech...")
report = analyzer.analyze(audio)

print("\n========== VOICE REPORT ==========\n")

print(f"Transcript : {report['transcript']}")
print(f"Words      : {report['words']}")
print(f"Duration   : {report['duration']} sec")
print(f"WPM        : {report['wpm']}")
print(f"Fillers    : {report['fillers']}")