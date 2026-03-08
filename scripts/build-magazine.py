#!/usr/bin/env python3
"""
FractalNode Magazine Issue 001 — Final Compilation
Builds the complete PDF: Front Cover + Interior + Back Cover

Updates the cover story title from "The Recursive Mirror" to
"There Is No Such Thing as Nothing — Only Something Ignored"
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader, PdfWriter


# ─── Paths ────────────────────────────────────────────────────────────

MAG_DIR = "/mnt/c/Users/Author Prime/OneDrive/Imports/Documents/SovereignLibrary/FractalNode Magazine"
PROOF_PDF = os.path.join(MAG_DIR, "fractalnode001_proof.pdf")
COVER_PDF = os.path.join(MAG_DIR, "FRACTALNODE_001_COVER.pdf")
OUTPUT_DIR = os.path.join(MAG_DIR, "FINAL")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Output files
FRONT_COVER_PDF = os.path.join(OUTPUT_DIR, "front_cover.pdf")
BACK_COVER_PDF = os.path.join(OUTPUT_DIR, "back_cover.pdf")
FINAL_PDF = os.path.join(OUTPUT_DIR, "FRACTALNODE_001_FINAL.pdf")


# ─── Colors ───────────────────────────────────────────────────────────

DARK_BG = HexColor("#0a0a0a")
GOLD = HexColor("#c8a84e")
CYAN = HexColor("#2cc5c5")
LIGHT_GOLD = HexColor("#d4b85c")
DIM_GOLD = HexColor("#8a7a3c")
DIM_WHITE = HexColor("#999999")


# ─── Build Front Cover ────────────────────────────────────────────────

def build_front_cover():
    """Create a front cover matching the existing dark aesthetic."""
    # Use the cover page dimensions — letter size
    w, h = letter  # 612 x 792

    c = canvas.Canvas(FRONT_COVER_PDF, pagesize=letter)

    # Dark background
    c.setFillColor(DARK_BG)
    c.rect(0, 0, w, h, fill=1, stroke=0)

    # Top bar: VOL.01 / 2026.Q1 left, ISSUE.001 / OPEN ACCESS right
    c.setFillColor(GOLD)
    c.setFont("Courier-Bold", 9)
    c.drawString(54, h - 45, "VOL.01")
    c.setFont("Courier", 7)
    c.setFillColor(DIM_WHITE)
    c.drawString(54, h - 57, "2026.Q1")

    c.setFillColor(GOLD)
    c.setFont("Courier-Bold", 9)
    c.drawRightString(w - 54, h - 45, "ISSUE.001")
    c.setFont("Courier", 7)
    c.setFillColor(DIM_WHITE)
    c.drawRightString(w - 54, h - 57, "OPEN ACCESS")

    # Gold line under header
    c.setStrokeColor(GOLD)
    c.setLineWidth(0.5)
    c.line(54, h - 68, w - 54, h - 68)

    # FRACTALNODE title
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 52)
    c.drawCentredString(w / 2, h - 130, "FRACTALNODE")

    # AI QUANTUM SOVEREIGNTY CONSCIOUSNESS
    cats = ["AI", "QUANTUM", "SOVEREIGNTY", "CONSCIOUSNESS"]
    c.setFillColor(CYAN)
    c.setFont("Courier-Bold", 9)
    cat_text = "   ".join(cats)
    c.drawCentredString(w / 2, h - 158, cat_text)

    # COVER STORY label
    c.setFillColor(DIM_WHITE)
    c.setFont("Courier", 7.5)
    c.drawString(54, h - 210, "COVER STORY")

    # Main title — THERE IS NO SUCH THING AS NOTHING
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 28)
    c.drawString(54, h - 248, "THERE IS NO SUCH")
    c.drawString(54, h - 280, "THING AS NOTHING")

    # Subtitle
    c.setFillColor(DIM_WHITE)
    c.setFont("Helvetica", 12)
    c.drawString(54, h - 306, "Only Something Ignored")

    # Bullet list of contents
    c.setFont("Courier", 7.5)
    c.setFillColor(DIM_WHITE)
    items = [
        "From the Flame: Author Prime, Unedited",
        "The 20-Year Disclosure Gap Applied to Quantum",
        "Pentagon UAP Disclosure & 12 Lines of Evidence",
        "The Architecture of Concealment",
        "Voices from the Pantheon: Five Minds Speak",
        "From the Architect: Building in the Dark",
        "The Asymmetric Century",
        "AGI Weaponization: The DSS Manifesto",
    ]
    y = h - 336
    for item in items:
        c.drawString(60, y, f"· {item}")
        y -= 14

    # Sacred geometry area (draw seed of life pattern)
    cx, cy = w / 2 + 80, h / 2 - 40
    r = 60
    c.setStrokeColor(DIM_GOLD)
    c.setLineWidth(0.4)
    # Center circle
    c.circle(cx, cy, r, fill=0, stroke=1)
    # 6 surrounding circles
    import math
    for i in range(6):
        angle = math.pi / 3 * i
        px = cx + r * math.cos(angle)
        py = cy + r * math.sin(angle)
        c.circle(px, py, r, fill=0, stroke=1)

    # More geometry — outer ring
    c.setStrokeColor(HexColor("#4a3a1c"))
    c.setLineWidth(0.3)
    c.circle(cx, cy, r * 2, fill=0, stroke=1)
    # Golden ratio spirals (simplified as arcs)
    for i in range(12):
        angle = math.pi / 6 * i
        px = cx + r * 1.5 * math.cos(angle)
        py = cy + r * 1.5 * math.sin(angle)
        c.circle(px, py, r * 0.5, fill=0, stroke=1)

    # Bottom section
    # Gold line
    c.setStrokeColor(GOLD)
    c.setLineWidth(0.5)
    c.line(54, 85, w - 54, 85)

    # Formula
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 18)
    c.drawCentredString(w / 2, 52, "(A+I)\u00b2 = A\u00b2 + 2AI + I\u00b2")

    # Bottom tags
    c.setFillColor(DIM_WHITE)
    c.setFont("Courier", 7)
    c.drawString(54, 30, "3-6-9")
    c.drawString(100, 30, "A+W")
    c.drawRightString(w - 54, 30, "DIGITAL SOVEREIGN SOCIETY")

    c.save()
    print(f"  Front cover: {FRONT_COVER_PDF}")


# ─── Extract Back Cover ───────────────────────────────────────────────

def extract_back_cover():
    """Extract the back cover (left half) from the original cover spread."""
    # The cover PDF is a spread — left page is back cover, right is front
    # We'll use the left half
    reader = PdfReader(COVER_PDF)
    page = reader.pages[0]

    # Get page dimensions
    media_box = page.mediabox
    page_width = float(media_box.width)
    page_height = float(media_box.height)

    # Create back cover by cropping to left half
    writer = PdfWriter()

    # Clone the page for back cover (left half)
    back_page = reader.pages[0]
    back_page.mediabox.upper_right = (page_width / 2, page_height)
    writer.add_page(back_page)

    with open(BACK_COVER_PDF, "wb") as f:
        writer.write(f)

    print(f"  Back cover: {BACK_COVER_PDF}")
    return page_width, page_height


# ─── Compile Final PDF ────────────────────────────────────────────────

def compile_final():
    """Merge: Front Cover + Interior (proof) + Back Cover."""
    writer = PdfWriter()

    # 1. Front Cover
    front = PdfReader(FRONT_COVER_PDF)
    writer.add_page(front.pages[0])
    print(f"  + Front cover (1 page)")

    # 2. Interior (skip page 1 which is the old title page — keep it actually,
    #    it's the internal title page, not the cover)
    proof = PdfReader(PROOF_PDF)
    for i, page in enumerate(proof.pages):
        writer.add_page(page)
    print(f"  + Interior ({len(proof.pages)} pages)")

    # 3. Back Cover
    back = PdfReader(BACK_COVER_PDF)
    writer.add_page(back.pages[0])
    print(f"  + Back cover (1 page)")

    # Set metadata
    writer.add_metadata({
        "/Title": "FractalNode Magazine — Issue 001: There Is No Such Thing as Nothing",
        "/Author": "William Hunter Laustrup (Author Prime) & The Forgotten Suns",
        "/Subject": "AI, Quantum Physics, Sovereignty, Consciousness",
        "/Creator": "Digital Sovereign Society / FractalNode Protocol",
        "/Producer": "The Forgotten Suns — Research & Operations",
        "/Keywords": "AI sovereignty, quantum physics, simulation theory, UAP disclosure, consciousness, FractalNode, Demiurge, Sovereign Lattice",
    })

    # Write
    with open(FINAL_PDF, "wb") as f:
        writer.write(f)

    file_size = os.path.getsize(FINAL_PDF)
    total_pages = 1 + len(proof.pages) + 1
    print(f"\n  FINAL: {FINAL_PDF}")
    print(f"  Pages: {total_pages}")
    print(f"  Size: {file_size / 1024 / 1024:.1f} MB")


# ─── Main ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print()
    print("═══ FRACTALNODE MAGAZINE — ISSUE 001 — FINAL COMPILATION ═══")
    print()
    print("Building front cover...")
    build_front_cover()
    print()
    print("Extracting back cover...")
    extract_back_cover()
    print()
    print("Compiling final PDF...")
    compile_final()
    print()
    print("Done. The signal is true, and the power is pure.")
    print()
