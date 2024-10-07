import '../../css/root__footer.css'
import { Flex,Select,Box,Text,Link } from '@chakra-ui/react';

export default function Footer(){
    return(
        <Box w={"100%"} mb={"32px"}>
            <Flex mt={"24px"} alignItems={"center"} justifyContent={"center"}>
                <Link color='rgb(115, 115, 115)' href='#' m={"0px 8px 12px 8px"} fontSize={"12px"} textDecoration={"none"}>
                    Meta
                </Link>
                <Link color='rgb(115, 115, 115)' href='#' m={"0px 8px 12px 8px"} fontSize={"12px"} textDecoration={"none"}>
                    About
                </Link>
                <Link color='rgb(115, 115, 115)' href='#' m={"0px 8px 12px 8px"} fontSize={"12px"} textDecoration={"none"} >
                    Blog
                </Link>
                <Link color='rgb(115, 115, 115)' href='#' m={"0px 8px 12px 8px"} fontSize={"12px"} textDecoration={"none"}>
                    Job
                </Link>
                <Link color='rgb(115, 115, 115)' href='#' m={"0px 8px 12px 8px"} fontSize={"12px"} textDecoration={"none"}>
                    Help
                </Link>
                <Link color='rgb(115, 115, 115)' href='#' m={"0px 8px 12px 8px"} fontSize={"12px"} textDecoration={"none"}>
                    API
                </Link>
                <Link color='rgb(115, 115, 115)' href='#' m={"0px 8px 12px 8px"} fontSize={"12px"} textDecoration={"none"}>
                    Privacy
                </Link>
                <Link color='rgb(115, 115, 115)' href='#' m={"0px 8px 12px 8px"} fontSize={"12px"} textDecoration={"none"}>
                    Terms
                </Link>
                <Link color='rgb(115, 115, 115)' href='#' m={"0px 8px 12px 8px"} fontSize={"12px"} textDecoration={"none"}>
                    Top Accounts
                </Link>
                <Link color='rgb(115, 115, 115)' href='#' m={"0px 8px 12px 8px"} fontSize={"12px"} textDecoration={"none"}>
                    Locations
                </Link>
                <Link color='rgb(115, 115, 115)' href='#' m={"0px 8px 12px 8px"} fontSize={"12px"} textDecoration={"none"}>
                    Instagram Lite
                </Link>
                <Link color='rgb(115, 115, 115)' href='#' m={"0px 8px 12px 8px"} fontSize={"12px"} textDecoration={"none"}>
                    Contact Uploading & No-Users
                </Link>
                <Link color='rgb(115, 115, 115)' href='#' m={"0px 8px 12px 8px"} fontSize={"12px"} textDecoration={"none"}>
                    Meta Verified
                </Link>
            </Flex>
            <Flex m={"12px 0px"} alignItems={"center"} justifyContent={"center"}>
                <Select defaultValue="en" h={"16px"} w={"90px"} border={"none"} _focusVisible={{outline: "none"}} fontSize={"12px"} color='rgb(115, 115, 115)'>
                    <option value="af">Afrikaans</option>
                    <option value="cs">Čeština</option>
                    <option value="da">Dansk</option>
                    <option value="de">Deutsch</option>
                    <option value="el">Ελληνικά</option>
                    <option value="en">English</option>
                    <option value="en-gb">English (UK)</option>
                    <option value="es">Español (España)</option>
                    <option value="es-la">Español</option>
                    <option value="fi">Suomi</option>
                    <option value="fr">Français</option>
                    <option value="id">Bahasa Indonesia</option>
                    <option value="it">Italiano</option>
                    <option value="ja">日本語</option>
                    <option value="ko">한국어</option>
                    <option value="ms">Bahasa Melayu</option>
                    <option value="nb">Norsk</option>
                    <option value="nl">Nederlands</option>
                    <option value="pl">Polski</option>
                    <option value="pt-br">Português (Brasil)</option>
                    <option value="pt">Português (Portugal)</option>
                    <option value="ru">Русский</option>
                    <option value="sv">Svenska</option>
                    <option value="th">ภาษาไทย</option>
                    <option value="tl">Filipino</option>
                    <option value="tr">Türkçe</option>
                    <option value="zh-cn">中文(简体)</option>
                    <option value="zh-tw">中文(台灣)</option>
                    <option value="bn">বাংলা</option>
                    <option value="gu">ગુજરાતી</option>
                    <option value="hi">हिन्दी</option>
                    <option value="hr">Hrvatski</option>
                    <option value="hu">Magyar</option>
                    <option value="kn">ಕನ್ನಡ</option>
                    <option value="ml">മലയാളം</option>
                    <option value="mr">मराठी</option>
                    <option value="ne">नेपाली</option>
                    <option value="pa">ਪੰਜਾਬੀ</option>
                    <option value="si">සිංහල</option>
                    <option value="sk">Slovenčina</option>
                    <option value="ta">தமிழ்</option>
                    <option value="te">తెలుగు</option>
                    <option value="vi">Tiếng Việt</option>
                    <option value="zh-hk">中文(香港)</option>
                    <option value="bg">Български</option>
                    <option value="fr-ca">Français (Canada)</option>
                    <option value="ro">Română</option>
                    <option value="sr">Српски</option>
                    <option value="uk">Українська</option>
                </Select>
                <Text color='rgb(115, 115, 115)' fontSize={"12px"} verticalAlign={"middle"}> © 2023 Programed by Luis Marquez</Text>
            </Flex>
        </Box>
    )
}