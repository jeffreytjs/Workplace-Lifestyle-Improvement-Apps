import { useEffect, useState } from "react";

const QUOTES = [
    ["Mindfulness means being awake. It means knowing what you are doing.", "― Jon Kabat-Zinn, from Wherever You Go, There You Are"],
    ["To produce at your peak level, you need to work for extended periods with full concentration on a single task free from distraction.", "― Cal Newport, from Deep Work"],
    ["Be where you are; otherwise, you will miss your life.", "― Buddha"],
    ["Time isn’t precious at all, because it is an illusion. What you perceive as precious is not time but the one point that is out of time: the Now. That is precious indeed. The more you are focused on time — past and future — the more you miss the Now, the most precious thing there is.", "― Eckhart Tolle, from The Power of Now"],
    ["Life gives you plenty of time to do whatever you want to do if you stay in the present moment.", "— Deepak Chopra"],
    ["Mindfulness gives you time. Time gives you choices. Choices, skillfully made, lead to freedom.", "– Bhante H. Gunaratana"],
    ["How we pay attention to the present moment largely determines the character of our experience, and therefore, the quality of our lives.", "– Sam Harris, from Waking Up: A Guide to Spirituality Without Religion"],
    ["Breathing in, I calm body and mind. Breathing out, I smile. Dwelling in the present moment I know this is the only moment.", "– Thich Nhat Hanh, from Being Peace"],
    ["Peace comes from within. Do not seek it without.", "– Buddha"],
    ["You can’t stop the waves, but you can learn to surf.", "– Jon Kabat–Zinn"],
    ["If you want to conquer the anxiety of life, live in the moment, live in the breath.", "– Amit Ray, from Om Chanting and Meditation"],
    ["Just when you feel you have no time to relax, know this is the moment you most need to relax.", "– Matt Haig, from Reason to Stay Alive"],
    ["If a problem is fixable, if a situation is such that you can do something about it, then there is no need to worry. If it's not fixable, then there is no help in worrying. There is no benefit in worrying whatsoever.", "– Dalai Lama"],
    ["We spend precious hours fearing the inevitable. It would be wise to use that time adoring our families, cherishing our friends and living our lives.", "– Maya Angelou"],
    ["Nowhere can man find a quieter or more untroubled retreat than in his own soul.", "– Marcus Aurelius"],
    ["Best advice ever received was from one of my meditation teachers at the monastery: ‘Be present, be patient, be gentle, be kind…everything else will take care of itself.’", "– Andy Puddicombe, from Headspace"],
    ["If it’s out of your hands, it deserves freedom from your mind too.", "– Ivan Nuru"],
    ["When you're quiet, everything settles on the floor of your mind like sediment in undisturbed still water.", "– Megan Monahan"],
    ["Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom.", "– Victor Frankl, author of Man's Search for Meaning"],
    ["Hope is important because it can make the present moment less difficult to bear. If we believe that tomorrow will be better, we can bear a hardship today.", "– Thich Nhat Hanh, from Peace is Every Step"],
    ["Remember that sometimes not getting what you want is a wonderful stroke of luck.", "– Dalai Lama"],
    ["To think in terms of either pessimism or optimism oversimplifies the truth. The problem is to see reality as it is.", "– Thich Nhat Hanh, from The Miracle of Mindfulness"],
    ["Every experience, no matter how bad it seems, holds within it a blessing of some kind. The goal is to find it.", "– Buddha"],
    ["No one can hurt me without my permission.", "– Mahatma Gandhi"],
    ["And when the broken-hearted people living in the world agree, there will be an answer, let it be.", "– The Beatles, from Let It Be"],
    ["Remember the blue sky. It may at times be obscured by clouds, but it is always there.", "— Andy Puddicombe, from Headspace"],
    ["Your focus determines your reality.", "– Qui-Gon Jinn tells Anakin, from Stars Wars Episode I: The Phantom Menace"],
    ["Let go of the battle. Breathe quietly and let it be. Let your body relax and your heart soften.", "– Jack Kornfield, from A Path with Heart"],
    ["These mountains that you are carrying, you were only supposed to climb.", "– Najwa Zebian"],
    ["It is very rare or almost impossible that an event can be negative from all points of view.", "– Dalai Lama"],
    ["In our times, it is radical to choose to sit still and be silent, to resist an identity of busyness, ceaseless motion, and noise, and to reclaim our sanity and humanity by coming home to ourselves.", "– Sumi Loundon Kim"],
    ["Nature does not hurry, yet everything is accomplished.", "– Lao Tzu"],
    ["In today’s rush, we all think too much – seek too much – want too much – and forget about the joy of just being.", "– Eckhart Tolle"],
    ["Almost everything will work again if you unplug it for a few minutes ... including you.", "— Anne Lamott, 12 Truths I Learned from Life and Writing"],
    ["It takes courage to say yes to rest and play, in a culture where exhaustion is seen as a symbol status.", "– Brené Brown"],
    ["There is nothing more important to true growth than realizing that you are not the voice of the mind—you are the one who hears it.", "— Michael A. Singer, from The Untethered Soul: The Journey Beyond Yourself"],
    ["So much time and effort is spent on wanting to change, trying to change, to be somebody different, better, or new. Why not use this time to get comfortable with yourself as you are instead?", "– Andy Puddicombe, from Headspace "],
    ["Don’t believe everything you think. Thoughts are just that – thoughts.", "–  Allan Lokos, from Pocket Peace: Effective Practices for Enlightened Living"],
    ["We are shaped by our thoughts; we become what we think. When the mind is pure, joy follows like a shadow that never leaves.", "– Buddha"],
    ["Our own worst enemy cannot harm us as much as our unwise thoughts. No one can help us as much as our compassionate thoughts.", "– Buddha"],
    ["Everything is created twice. First in the mind and then in reality.", "– Robin Sharma, from The Monk Who Sold His Ferrari"],
    ["Each morning we are born again. What we do today is what matters most.", "– Buddha"],
    ["To be beautiful means to be yourself. You don’t need to be accepted by others. You need to accept yourself.", "– Thich Nhat Hanh, from The Art of Power"],
];

export default function MindfulnessQuotes() {
    const [text, setText] = useState(["", ""]);
    const [additionalClass, setAdditionalClass] = useState("invisible");

    const hideText = () => {
        setAdditionalClass("quote-fade-out");
        setTimeout(showText, 10000);
    }

    const showText = () => {
        const texts = QUOTES[Math.floor(QUOTES.length * Math.random())];
        setText(texts);
        setAdditionalClass("quote-fade-in");
        setTimeout(hideText, 12000);
    }

    useEffect(() => {
        const showTextInterval = setTimeout(showText, 10000);
        return () => clearInterval(showTextInterval);
    }, [])

    return (
        <div className={`white-div ${additionalClass}`} style={{padding: "10px", maxWidth: "500px", marginTop: "100px"}} >
            {text[0]}
            <br />
            <i>{text[1]}</i>
        </div>
    )
}