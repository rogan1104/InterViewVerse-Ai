class SummaryGenerator:

    def generate(self, report):

        summary = []

        # Eye Contact
        if report["eye_contact"] >= 80:
            summary.append(
                "Excellent eye contact maintained throughout the interview."
            )

        elif report["eye_contact"] >= 60:
            summary.append(
                "Maintained generally good eye contact."
            )

        else:
            summary.append(
                "Frequent loss of eye contact was observed."
            )

        # Blink Analysis
        blink_rate = report["blink_rate"]

        if blink_rate < 10:
            summary.append(
                "Blink rate appears lower than normal."
            )

        elif blink_rate <= 25:
            summary.append(
                "Blink rate remained within a normal range."
            )

        else:
            summary.append(
                "Frequent blinking detected."
            )

        # Engagement
        if report["engagement"] >= 85:
            summary.append(
                "Overall visual engagement was high."
            )

        elif report["engagement"] >= 65:
            summary.append(
                "Overall visual engagement was moderate."
            )

        else:
            summary.append(
                "Overall visual engagement was low."
            )

        return summary