interface TablePlaceholderProps {
    text: string;
    colSpan?: number;
    align?: "left" | "center" | "right" | "justify" | "char";
}
function TablePlaceholder({text, colSpan = 6, align = "center"}: TablePlaceholderProps) {
  return (
    <tr>
      <td colSpan={colSpan} align={align}>
        {text}
      </td>
    </tr>
  );
}

export default TablePlaceholder;
