/* eslint-disable react/prop-types */
import HeartIcon from '../../assets/heart.svg';

export default function Fav({onShow}) {
    return (
        <div  onClick={onShow} className="p-2 flex justify-between  hover:bg-rose-400 bg-sky-500 text-slate-200 cursor-pointer flex transition-all duration-150 ease-in-out gap-2 items-center rounded-md ">
            <img src={HeartIcon} alt="" />
            <div className="text-[10px] md:text-[14px]" onClick={ onShow }>Favorites</div>
        </div>
    );
}
