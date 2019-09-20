import Link from 'next/link'
import "../style.css"


export default function Header() {
  return (
    <div class="pure-menu pure-menu-horizontal">
      <Link href="/">
        <a class="pure-menu-heading pure-menu-link">Home</a>
      </Link>
      <ul class="pure-menu-list">
        <li class="pure-menu-item"><a href="#" class="pure-menu-link">News</a></li>
    </ul>
    </div>



  )
}
