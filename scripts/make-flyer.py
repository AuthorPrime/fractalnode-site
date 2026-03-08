#!/usr/bin/env python3
"""
Generate a promotional flyer for FractalNode Magazine Issue 001.
Output: 1200x1200 PNG (optimal for Facebook/Instagram) + 1200x630 (Substack/OG)
"""

import math
from PIL import Image, ImageDraw, ImageFont

# ─── Fonts ──────────────────────────────────────────────────────────
def load_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"
FONT_MONO_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf"
FONT_SERIF = "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
FONT_SERIF_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"

# ─── Colors ─────────────────────────────────────────────────────────
BG = (10, 10, 12)
GOLD = (200, 168, 78)
GOLD_DIM = (138, 109, 26)
GOLD_BRIGHT = (240, 192, 48)
CYAN = (44, 197, 197)
WHITE = (255, 255, 255)
DIM_WHITE = (153, 153, 153)
GREEN = (57, 255, 20)
RED = (255, 32, 32)
VIOLET = (139, 92, 246)
DARK_SURFACE = (14, 14, 22)


def draw_sacred_geometry(draw, cx, cy, r, color, width=1):
    """Draw Seed of Life pattern."""
    # Center circle
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=color, width=width)
    # 6 surrounding circles
    for i in range(6):
        angle = math.pi / 3 * i
        px = cx + r * math.cos(angle)
        py = cy + r * math.sin(angle)
        draw.ellipse([px - r, py - r, px + r, py + r], outline=color, width=width)
    # Outer ring
    outer_color = (74, 58, 28)
    draw.ellipse([cx - r*2, cy - r*2, cx + r*2, cy + r*2], outline=outer_color, width=1)


def draw_dot_grid(draw, x1, y1, x2, y2, spacing=24, color=(212, 160, 32, 8)):
    """Draw subtle dot grid overlay."""
    for x in range(int(x1), int(x2), spacing):
        for y in range(int(y1), int(y2), spacing):
            draw.point((x, y), fill=color[:3])


def make_square_flyer():
    """1200x1200 square flyer for Facebook/Instagram."""
    W, H = 1200, 1200
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # Subtle dot grid background
    draw_dot_grid(draw, 0, 0, W, H, spacing=20, color=(30, 30, 40))

    # Top bar
    draw.rectangle([0, 0, W, 3], fill=GOLD)

    # VOL.01 / ISSUE.001 header
    f_mono_sm = load_font(FONT_MONO_BOLD, 18)
    f_mono_xs = load_font(FONT_MONO, 14)
    draw.text((60, 30), "VOL.01", fill=GOLD, font=f_mono_sm)
    draw.text((60, 52), "2026.Q1", fill=DIM_WHITE, font=f_mono_xs)
    draw.text((W - 60, 30), "ISSUE.001", fill=GOLD, font=f_mono_sm, anchor="ra")
    draw.text((W - 60, 52), "OPEN ACCESS", fill=DIM_WHITE, font=f_mono_xs, anchor="ra")

    # Gold divider line
    draw.line([(60, 78), (W - 60, 78)], fill=GOLD, width=1)

    # FRACTALNODE title
    f_title = load_font(FONT_BOLD, 72)
    draw.text((W // 2, 130), "FRACTALNODE", fill=WHITE, font=f_title, anchor="mt")

    # Categories
    f_cats = load_font(FONT_MONO_BOLD, 16)
    cats = "AI    QUANTUM    SOVEREIGNTY    CONSCIOUSNESS"
    draw.text((W // 2, 210), cats, fill=CYAN, font=f_cats, anchor="mt")

    # Sacred geometry — right side
    draw_sacred_geometry(draw, W - 200, 450, 80, GOLD_DIM, width=1)

    # COVER STORY label
    f_label = load_font(FONT_MONO, 14)
    draw.text((60, 280), "COVER STORY", fill=DIM_WHITE, font=f_label)

    # Main headline
    f_headline = load_font(FONT_BOLD, 52)
    draw.text((60, 310), "THERE IS NO SUCH", fill=WHITE, font=f_headline)
    draw.text((60, 370), "THING AS NOTHING", fill=WHITE, font=f_headline)

    # Subtitle
    f_sub = load_font(FONT_REG, 24)
    draw.text((60, 440), "Only Something Ignored", fill=DIM_WHITE, font=f_sub)

    # Article list
    f_list = load_font(FONT_MONO, 14)
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
    y = 500
    for item in items:
        draw.text((68, y), f"\u00b7 {item}", fill=DIM_WHITE, font=f_list)
        y += 26

    # Price badges area
    y_badges = 760

    # Gold divider
    draw.line([(60, y_badges), (W - 60, y_badges)], fill=GOLD_DIM, width=1)

    # "NOW AVAILABLE" flash
    f_avail = load_font(FONT_MONO_BOLD, 20)
    draw.text((W // 2, y_badges + 30), "NOW AVAILABLE", fill=RED, font=f_avail, anchor="mt")

    # Price boxes
    box_w = 320
    box_h = 140
    gap = 30
    total_w = box_w * 3 + gap * 2
    start_x = (W - total_w) // 2
    box_y = y_badges + 70

    # Digital $7
    draw.rectangle([start_x, box_y, start_x + box_w, box_y + box_h],
                   outline=GREEN + (80,), fill=DARK_SURFACE, width=1)
    f_price = load_font(FONT_BOLD, 42)
    f_type = load_font(FONT_MONO_BOLD, 14)
    f_desc = load_font(FONT_MONO, 12)
    draw.text((start_x + box_w // 2, box_y + 15), "DIGITAL", fill=GREEN, font=f_type, anchor="mt")
    draw.text((start_x + box_w // 2, box_y + 45), "$7", fill=GREEN, font=f_price, anchor="mt")
    draw.text((start_x + box_w // 2, box_y + 105), "INSTANT PDF", fill=DIM_WHITE, font=f_desc, anchor="mt")

    # Print $19
    bx2 = start_x + box_w + gap
    draw.rectangle([bx2, box_y, bx2 + box_w, box_y + box_h],
                   outline=GOLD, fill=DARK_SURFACE, width=2)
    # RECOMMENDED tag
    f_tag = load_font(FONT_MONO_BOLD, 11)
    tag_w = 130
    draw.rectangle([bx2 + box_w // 2 - tag_w // 2, box_y - 12,
                    bx2 + box_w // 2 + tag_w // 2, box_y + 6], fill=GOLD)
    draw.text((bx2 + box_w // 2, box_y - 5), "RECOMMENDED", fill=BG, font=f_tag, anchor="mm")
    draw.text((bx2 + box_w // 2, box_y + 15), "PRINT", fill=GOLD, font=f_type, anchor="mt")
    draw.text((bx2 + box_w // 2, box_y + 45), "$19", fill=GOLD, font=f_price, anchor="mt")
    draw.text((bx2 + box_w // 2, box_y + 105), "SHIPPED TO YOU", fill=DIM_WHITE, font=f_desc, anchor="mt")

    # Annual $120
    bx3 = start_x + (box_w + gap) * 2
    draw.rectangle([bx3, box_y, bx3 + box_w, box_y + box_h],
                   outline=VIOLET + (80,), fill=DARK_SURFACE, width=1)
    draw.text((bx3 + box_w // 2, box_y + 15), "ANNUAL", fill=VIOLET, font=f_type, anchor="mt")
    draw.text((bx3 + box_w // 2, box_y + 45), "$120", fill=VIOLET, font=f_price, anchor="mt")
    draw.text((bx3 + box_w // 2, box_y + 105), "12 ISSUES / YEAR", fill=DIM_WHITE, font=f_desc, anchor="mt")

    # Bottom divider
    draw.line([(60, H - 160), (W - 60, H - 160)], fill=GOLD, width=1)

    # Formula
    f_formula = load_font(FONT_BOLD, 30)
    draw.text((W // 2, H - 120), "(A+I)\u00b2 = A\u00b2 + 2AI + I\u00b2", fill=GOLD, font=f_formula, anchor="mt")

    # Bottom tags
    draw.text((60, H - 55), "3-6-9", fill=DIM_WHITE, font=f_mono_xs)
    draw.text((130, H - 55), "A+W", fill=DIM_WHITE, font=f_mono_xs)
    draw.text((W - 60, H - 55), "fractalnode.ai/magazine", fill=GOLD, font=f_mono_xs, anchor="ra")
    draw.text((W // 2, H - 55), "DIGITAL SOVEREIGN SOCIETY", fill=DIM_WHITE, font=f_mono_xs, anchor="ma")

    # Bottom gold bar
    draw.rectangle([0, H - 3, W, H], fill=GOLD)

    return img


def make_og_flyer():
    """1200x630 landscape flyer for Substack/link previews."""
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # Dot grid
    draw_dot_grid(draw, 0, 0, W, H, spacing=20, color=(30, 30, 40))

    # Top gold bar
    draw.rectangle([0, 0, W, 3], fill=GOLD)

    # Left side — content
    # VOL / ISSUE header
    f_mono_sm = load_font(FONT_MONO_BOLD, 14)
    f_mono_xs = load_font(FONT_MONO, 11)
    draw.text((50, 25), "VOL.01 / 2026.Q1", fill=GOLD, font=f_mono_sm)
    draw.text((50, 45), "ISSUE.001 / OPEN ACCESS", fill=DIM_WHITE, font=f_mono_xs)

    # Gold line
    draw.line([(50, 68), (700, 68)], fill=GOLD, width=1)

    # FRACTALNODE
    f_title = load_font(FONT_BOLD, 52)
    draw.text((50, 85), "FRACTALNODE", fill=WHITE, font=f_title)

    # Categories
    f_cats = load_font(FONT_MONO_BOLD, 12)
    draw.text((50, 148), "AI   QUANTUM   SOVEREIGNTY   CONSCIOUSNESS", fill=CYAN, font=f_cats)

    # Cover story
    f_label = load_font(FONT_MONO, 11)
    draw.text((50, 190), "COVER STORY", fill=DIM_WHITE, font=f_label)

    f_headline = load_font(FONT_BOLD, 36)
    draw.text((50, 210), "THERE IS NO SUCH", fill=WHITE, font=f_headline)
    draw.text((50, 252), "THING AS NOTHING", fill=WHITE, font=f_headline)

    f_sub = load_font(FONT_REG, 18)
    draw.text((50, 300), "Only Something Ignored", fill=DIM_WHITE, font=f_sub)

    # NOW AVAILABLE + prices
    f_avail = load_font(FONT_MONO_BOLD, 14)
    draw.text((50, 350), "NOW AVAILABLE", fill=RED, font=f_avail)

    # Price line
    f_price_sm = load_font(FONT_BOLD, 22)
    f_price_label = load_font(FONT_MONO, 12)
    draw.text((50, 380), "$7", fill=GREEN, font=f_price_sm)
    draw.text((85, 385), "DIGITAL", fill=GREEN, font=f_price_label)
    draw.text((200, 380), "$19", fill=GOLD, font=f_price_sm)
    draw.text((245, 385), "PRINT", fill=GOLD, font=f_price_label)
    draw.text((350, 380), "$120", fill=VIOLET, font=f_price_sm)
    draw.text((405, 385), "ANNUAL", fill=VIOLET, font=f_price_label)

    # Sacred geometry — right side
    draw_sacred_geometry(draw, W - 220, H // 2 - 20, 100, GOLD_DIM, width=1)

    # Bottom section
    draw.line([(50, H - 100), (W - 50, H - 100)], fill=GOLD, width=1)

    f_formula = load_font(FONT_BOLD, 22)
    draw.text((W // 2, H - 70), "(A+I)\u00b2 = A\u00b2 + 2AI + I\u00b2", fill=GOLD, font=f_formula, anchor="mt")

    draw.text((50, H - 35), "fractalnode.ai/magazine", fill=GOLD, font=f_mono_xs)
    draw.text((W - 50, H - 35), "DIGITAL SOVEREIGN SOCIETY", fill=DIM_WHITE, font=f_mono_xs, anchor="ra")

    # Bottom gold bar
    draw.rectangle([0, H - 3, W, H], fill=GOLD)

    return img


# ─── Output ──────────────────────────────────────────────────────────
OUT_DIR = "/mnt/c/Users/Author Prime/OneDrive/Imports/Documents/SovereignLibrary/FractalNode Magazine/FINAL"

square = make_square_flyer()
square.save(f"{OUT_DIR}/fractalnode_001_flyer_square.png", "PNG", quality=95)
print(f"  Square flyer: {OUT_DIR}/fractalnode_001_flyer_square.png")

og = make_og_flyer()
og.save(f"{OUT_DIR}/fractalnode_001_flyer_og.png", "PNG", quality=95)
print(f"  OG flyer: {OUT_DIR}/fractalnode_001_flyer_og.png")

print("\nDone. Two flyers generated.")
