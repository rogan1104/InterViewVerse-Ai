import json
import os


class ReportGenerator:

    def save(self, report):

        os.makedirs("output", exist_ok=True)

        path = os.path.abspath("output/interview_report.json")
        print("Saving to:", path)

        with open(path, "w") as file:

            json.dump(
                report,
                file,
                indent=4
            )

        print("Interview report saved successfully!")
        print("===== REPORT SAVED =====")
        print(report)