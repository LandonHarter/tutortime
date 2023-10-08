import Colors from 'tailwindcss/colors';

export function randomColor() {
    const colors = [Colors.red, Colors.orange, Colors.amber, Colors.yellow, Colors.lime, Colors.green, Colors.emerald, Colors.teal, Colors.cyan, Colors.sky, Colors.blue, Colors.indigo, Colors.violet, Colors.purple, Colors.fuchsia, Colors.rose];
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    return randomColor['500'];
}