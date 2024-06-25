/* eslint-disable react/prop-types */

export default function Fav({onShow}) {
    return (
        <div  onClick={onShow} className="p-2 flex justify-between  hover:bg-rose-400 bg-sky-500 text-slate-200 cursor-pointer transition-all duration-150 ease-in-out gap-2 items-center rounded-md ">
            {/* <img src={HeartIcon} alt="" /> */}
            <div className="text-[9px] md:text-[14px]" onClick={ onShow }>Favorites</div>
        </div>
    );
}
